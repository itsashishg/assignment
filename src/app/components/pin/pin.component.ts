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
import { FileUploader, FileItem, FileUploadModule } from 'ng2-file-upload';
import { NgxSelectModule } from 'ngx-select-ex';
import { CustomerData } from '../models';

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

  constructor(private service: DataService, private dialog: MatDialogRef<PinComponent>) {
    service.getCustomerDetails().subscribe({
      next: res => {
        this.collaboratorsList = res;
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
    this.service.addPin(this.pinInfo.value);
    this.dialog.close();
  }
}
