import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService, OrderAction } from 'src/app/modules/appointment/services/appointment.service';
import { NotificationTypeEnum, SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.scss']
})
export class SellerOrdersComponent implements OnInit {
orderAction:OrderAction={id:null,action:null}
  constructor(private appointmentService:AppointmentService,private snackbarService:SnackBarService,private router:Router) { }
  orders:any=[];
  ngOnInit(): void {
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==2){

     let userId=user.user.id;
     this.appointmentService.GetSellerOrders(userId).subscribe((res)=>{
      if(res.statusCode==200){
        this.orders=res.data;
        console.log(this.orders)
      }
    })
    }
    else{
      this.router.navigateByUrl('/book/patient-appointments');
    }
  
  }
  OrderAction(id,action){
    this.orderAction.id=id;
    this.orderAction.action=action;
    this.appointmentService.OrderAction(this.orderAction).subscribe((res)=>{
      if(res.data){
        this.snackbarService.openSnack(res.swallText.title,NotificationTypeEnum.Success);
         this.ngOnInit();
       // this.appointmentDto.DoctorId=this.doctor;
      }
    })
  }
}

