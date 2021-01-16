import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatdialogComponent} from "../components/matdialog/matdialog.component";


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  openConfirmDialog(msg:string){
   return  this.dialog.open(MatdialogComponent,{
      width: '490px',
      panelClass: 'confirm-dialog-container',
      disableClose:true,
     position:{top: '20px'},
      data: {
        mensaje:msg
      }
    })
  }
}
