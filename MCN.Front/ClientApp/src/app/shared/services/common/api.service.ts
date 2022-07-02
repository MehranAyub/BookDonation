
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';  
import { CustomSnackBarComponent } from '../../components/custom-snack-bar/custom-snack-bar.component';
import { SnackBarService, NotificationTypeEnum } from '../../snack-bar.service';

@Injectable({providedIn:'root'})
export class ApiService {
  constructor(
    private http: HttpClient, 
    private snackbar:SnackBarService
  ) {
   
   }

  private setHeaders(): HttpHeaders {
     
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache'
    }; 
    return new HttpHeaders(headers);
  }

 
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      if(error.status==0)
      {
        this.snackbar.openSnack("Link is down for temporary period of time",NotificationTypeEnum.Danger);
      }
      // else if(error.status==401)
      // {
      //   this.jwtService.destroyToken();
      //   this.router.navigateByUrl('/login');
      // }
      else
      {
        // Swal.fire(error.error.SwallText.title,error.error.SwallText.html,error.error.SwallText.type);

        this.snackbar.openSnack(error,NotificationTypeEnum.Danger);
      }
      this.snackbar.openSnack(error,NotificationTypeEnum.Danger);
      // TODO: send the error to remote logging infrastructure
      //return Observable.throw(error);
      throw error;
      
      console.error(error); // log to console instead
       
      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }

  get(path: string, parameters: HttpParams = new HttpParams()): Observable<any> {

    return this.http.get(
      `${environment.baseUrl}${path}`,
      { headers: this.setHeaders(), params: parameters }
    ).pipe(
      catchError(this.handleError())
    );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(
      catchError(this.handleError())
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(
      catchError(this.handleError())
    );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}${path}`,
      { headers: this.setHeaders() }
    ).pipe(
      catchError(this.handleError())
    );
  }
}
