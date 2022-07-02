import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseStatus } from './enums/response-status';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {


  constructor(private snackBar: MatSnackBar) { }

  openSnack(message: string, status: any, verticalPosition : any = 'top', horizontalPosition: any = "right", duration :any = 5000 ) {
    var snackPanelClass;
    switch (status) {
      case ResponseStatus.OK:
        snackPanelClass = NotificationTypeEnum.Success
        break;
      case ResponseStatus.Info:
        snackPanelClass = NotificationTypeEnum.Info
        break;
      case ResponseStatus.Error:
        snackPanelClass = NotificationTypeEnum.Danger
        break;
      case ResponseStatus.Warning:
        snackPanelClass = NotificationTypeEnum.Warning
        break;
      default:
        snackPanelClass = status;
        break;
    }
   return this.snackBar.open(message, '',
      {
        duration: duration,
        verticalPosition: verticalPosition,
        horizontalPosition: horizontalPosition,
        panelClass: [snackPanelClass]
      }
    );
  }

  openSnackFromComponent(message: string, status: any, verticalPosition : any = 'top', horizontalPosition: any = "center", duration :any = 10000 ) {
    var snackPanelClass;
    switch (status) {
      case ResponseStatus.OK:
        snackPanelClass = NotificationTypeEnum.Success
        break;
      case ResponseStatus.Info:
        snackPanelClass = NotificationTypeEnum.Info
        break;
      case ResponseStatus.Error:
        snackPanelClass = NotificationTypeEnum.Danger
        break;
      case ResponseStatus.Warning:
        snackPanelClass = NotificationTypeEnum.Warning
        break;
      default:
        snackPanelClass = status;
        break;
    }
   return this.snackBar.openFromComponent(CustomSnackBarComponent,
      { 
        duration: duration,
        verticalPosition: verticalPosition,
        horizontalPosition: horizontalPosition,
        panelClass: [snackPanelClass],
        data: { message: message}
      }
    );
  }


}

export enum NotificationTypeEnum {
  Info = "bg-info",
  Warning = "bg-warning",
  Success = "bg-success",
  Danger = "bg-danger"
}

