import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSelectModule } from 'ngx-select-ex';
import { DataService } from '../../services/data.service';
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
          this.snackBar.open('Something went wrong!', 'Close', { duration: 4000 });
        }
      },
      complete: () => {
        if (this.data) {
          delete this.data.showEdit; // removes the redundant key of showEdit used to manage visibility on screen.
          this.customerInfo.setValue(this.data);
        }
      }
    });
  }

  /**
   * Processes the received data and returns array of distinct regions.
   * @param data data received from backend
   * @returns allRegions
   */
  getAllRegions(data: Object): string[] {
    const regions = new Set();
    for (const countryData of Object.values(data)) {
      regions.add(countryData.region);
    }
    return Array.from(regions) as string[];
  }

  /**
   * Returns the list of countries corresponding to the region
   * @param data full data 
   * @param region region for which the countries are to be filtered by
   * @returns country list
   */
  getCountriesByRegion(data: Object, region: string) {
    const countries = [];
    for (const [countryCode, countryData] of Object.entries(data)) {
      if (countryData.region === region) {
        countries.push(countryData.country);
      }
    }
    return countries;
  }

  /**
   * To return a list of countries in dropdown
   * @param region 
   * @returns 
   */
  getCountryList(region: string | null) {
    if (region === null) {
      return [];
    }
    return this.areaDetails[region];
  }

  /**
   * Adds the country to the list of countries and closes the dialog box.
   */
  submitForm() {
    let newCustomer: CustomerData = this.customerInfo.value as CustomerData;
    this.service.addCustomer(newCustomer);
    this.dialog.close();
  }
}
