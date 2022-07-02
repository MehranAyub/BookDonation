import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/common/api.service'; 
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  url="Users/";

  private setHeaders(): HttpHeaders {
       
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache'
    };
    
    return new HttpHeaders(headers);
  }
  paramss:HttpParams = new HttpParams();
  
    constructor(private apiService: ApiService) { }
   
    register(user:User): Observable<any> {
      return this.apiService.post(this.url+'CreateUser',user);
  }
   
}
