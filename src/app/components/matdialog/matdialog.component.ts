import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-matdialog',
  templateUrl: './matdialog.component.html',
  styleUrls: ['./matdialog.component.css']
})
export class MatdialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<MatdialogComponent>) { }

  ngOnInit() {
  }

  closeDialog(){
  this.dialogRef.close(false);
  }
}
