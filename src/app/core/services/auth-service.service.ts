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
      this.storageService.setData('user',user);
      this.isAuth$.next(true);
  }
  public isAuth(user:IUser):void{
    const rawData = localStorage.getItem('user');
  }

  public getUser():IUser{
    const user:IUser=this.storageService.getData('user');
    return user;
  }

}
