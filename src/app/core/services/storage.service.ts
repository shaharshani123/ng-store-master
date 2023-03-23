import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct, IResponseProducts } from 'src/app/shared/models';
import { Routes } from '../API';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  public setData(key:string,value:any): void{
    const stringifiedData = JSON.stringify(value);
    localStorage.setItem(key,stringifiedData);
  }

  public getData(key:string):any{
    const rawData = localStorage.getItem(key);
    if(!rawData) return;
    const data = JSON.parse(rawData);
    return data;
  }

  public deleteData(key:string):void{
    const rawData = localStorage.getItem(key);
    if(!rawData) return;
    localStorage.removeItem(key);
  }

}
