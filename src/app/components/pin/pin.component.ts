import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FileItem, FileUploadModule, FileUploader } from 'ng2-file-upload';
import { NgxSelectModule } from 'ngx-select-ex';
import { DataService } from '../../services/data.service';
import { CustomerData, PinData } from '../models';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pin',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogModule, CommonModule, ReactiveFormsModule, MatButtonModule, FileUploadModule, NgxSelectModule],
  templateUrl: './pin.component.html',
  styleUrl: './pin.component.less'
})
export class PinComponent {
  pinInfo: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    customers: new FormControl('', Validators.required),
    privacy: new FormControl('', Validators.required),
  });
  hasBaseDropZoneOver: boolean = false;
  uploader: FileUploader = new FileUploader({ url: 'localhost' });
  collaboratorsList: CustomerData[] = [];

  constructor(private service: DataService, private dialog: MatDialogRef<PinComponent>, private snackBar: MatSnackBar,) {
    this.fetchCollaborators();
  }

  fetchCollaborators(): void {
    this.service.getCustomerDetails().subscribe({
      next: res => {
        this.collaboratorsList = res;
      },
      complete: () => {
        if (this.collaboratorsList.length === 0) {
          this.snackBar.open('No customers found, please add customers first', 'close', { duration: 4000 });
          this.dialog.close();
        }
      }
    });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  onFileSelected(event: any): void {
    const fileItem: FileItem = this.uploader.queue[this.uploader.queue.length - 1];
  }

  fileDrop(event: any): void {
    // Handle file drop event
  }

  submitPin() {
    let newPinAdded: PinData = { privacy: this.pinInfo.value.privacy, title: this.pinInfo.value.title, imageURL: '', collaborators: [] };
    this.pinInfo.value.customers.forEach((customerName: string) => {
      let customer = this.collaboratorsList.find(c => c.title === customerName);
      if (customer) {
        newPinAdded.collaborators.push(customer);
      }
    });
    this.service.addPin(newPinAdded);
    this.dialog.close();
  }
}
