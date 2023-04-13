import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { IUser } from 'src/app/shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private authServiceService:AuthServiceService
    , private storageService:StorageService ,public dialogRef:MatDialogRef<LoginComponent>){}
  public onSubmit(loginForm:NgForm){

    console.log(loginForm.value);
    //this.userI.email =loginForm.form.value.email;
    this.authServiceService.logIn(loginForm.value);
    this.dialogRef.close();
    this.authServiceService.isAuth(loginForm.value);
  }
}
