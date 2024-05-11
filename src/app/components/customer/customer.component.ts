import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { NgxSelectModule } from 'ngx-select-ex';
import { CustomerData } from '../models';


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogModule, CommonModule, NgxSelectModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.less'
})
export class CustomerComponent {
  customerInfo = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    region: new FormControl<string>('', [Validators.required]),
    country: new FormControl<string>('', [Validators.required])
  });

  areaDetails: any = {};
  allRegions: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: CustomerData | null, private service: DataService, private snackBar: MatSnackBar, private dialog: MatDialogRef<CustomerComponent>,) {
    this.fetchDetails();
    if (data) {
      delete data.showEdit;
      this.customerInfo.setValue(data);
    }
  }

  fetchDetails() {
    this.service.getRegionAndCountryData().subscribe({
      next: res => {
        if (res['status-code'] === 200) {
          this.allRegions = this.getAllRegions(res.data);
          this.allRegions.forEach((region: any) => {
            this.areaDetails[region] = this.getCountriesByRegion(res.data, region);
          });
        }
        else {
          this.snackBar.open('Something went wrong!', 'Close');
        }
      }
    });
  }

  getAllRegions(data: Object): string[] {
    const regions = new Set();
    for (const countryData of Object.values(data)) {
      regions.add(countryData.region);
    }
    return Array.from(regions) as string[];
  }

  getCountriesByRegion(data: Object, region: string) {
    const countries = [];
    for (const [countryCode, countryData] of Object.entries(data)) {
      if (countryData.region === region) {
        countries.push(countryData.country);
      }
    }
    return countries;
  }

  getCountryList(region: string | null) {
    if (region === null) {
      return [];
    }
    return this.areaDetails[region];
  }

  submitForm() {
    let newCustomer: CustomerData = this.customerInfo.value as CustomerData;
    this.service.addCustomer(newCustomer);
    this.dialog.close();
  }
}
