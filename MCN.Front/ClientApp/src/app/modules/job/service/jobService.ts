import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/common/api.service';
import { InterestDto, InterestFilter, SearchFilter, SearchResultDto } from '../models/mapService';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private  url="Search/";

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
   
    GetResults(model:SearchFilter): Observable<SearchResultDto[]> {
      return this.apiService.post(this.url+'GetResults',model);
  }

  GetInterestList(keyword): Observable<InterestDto[]> {
    let model:InterestFilter={Keyword:keyword,PageNumber:0,PageSize:10}
    return this.apiService.post('Interest/GetInterestList',model);
}
   
}