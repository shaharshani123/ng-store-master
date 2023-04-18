import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/services/storage.service';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-extantion',
  templateUrl: './extantion.component.html',
  styleUrls: ['./extantion.component.scss']
})
export class ExtantionComponent {
  constructor(
    private storageService:StorageService ,
    public dialogRef:MatDialogRef<ExtantionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{
      product:IProduct,
      type:string,
      msg:string
    }
    ){}
  public onSubmit(){
    this.dialogRef.close();
  }
}
