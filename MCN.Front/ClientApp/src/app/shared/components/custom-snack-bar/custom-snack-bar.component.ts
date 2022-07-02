import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrls: ['./custom-snack-bar.component.scss']
})
export class CustomSnackBarComponent implements OnInit {


  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,private snackBarRef:MatSnackBarRef<CustomSnackBarComponent>) {
    console.log(data); 
  }
 
  clearBar(): void {
    this.snackBarRef.dismiss();
    event?.preventDefault();
  }

  changeStatus() {
    this.snackBarRef.closeWithAction();
  } 
  ngOnInit() {
    console.log(this.data);
  }

 

}
