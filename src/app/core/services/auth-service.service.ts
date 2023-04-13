import { Injectable } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { Subject } from 'rxjs';
import { IUser } from 'src/app/shared/models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAuth$:Subject<boolean> = new Subject();

  constructor(private storageService:StorageService) {
  }

  public logIn(user:IUser):void{
      console.log(user);
      this.storageService.setData(user.role.toLocaleLowerCase(),user);
      this.isAuth$.next(true);
  }
  public isAuth(user:IUser):void{
    const user1:IUser=this.storageService.getData(user.role.toLowerCase());
    if(user.email.toUpperCase() == user1.email.toUpperCase() && user.role.toUpperCase() == user1.role.toUpperCase()&& user.pass == user1.pass){
      console.log("the "+ user.role +" exist");
    }else{
      console.log("the " + " " + user.email +" " + user.role +" exist");
    }
  }

  public getUser():IUser{
    const user:IUser=this.storageService.getData('user');
    return user;
  }

}
