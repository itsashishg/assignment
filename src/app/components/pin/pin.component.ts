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
import { FileUploader } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';

@Component({
  selector: 'app-pin',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogModule, CommonModule, ReactiveFormsModule, MatButtonModule, FileUploadModule],
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
  uploader: FileUploader = new FileUploader();
  constructor() { }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  submitPin() {

  }
}
