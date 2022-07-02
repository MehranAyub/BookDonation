import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { SnackBarService, NotificationTypeEnum } from 'src/app/shared/snack-bar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private appointmentService:AppointmentService,private snackbarService:SnackBarService,private router:Router) { }
  errors:string;
  orders:any=[];
  ngOnInit(): void {
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==1){
     let userId=user.user.id;
     this.appointmentService.GetUserOrders(userId).subscribe((res)=>{
      if(res.data!=null){
        this.orders=res.data;
      }
      else{
this.errors="You have not ordered any Book Yet"
      }
    })
    }
    else{
      
      this.router.navigateByUrl('/seller/appointments');
    }
  }

  CancelAppointment(id){
    this.appointmentService.CancelAppointment(id).subscribe((res)=>{
      if(res.data){
        this.snackbarService.openSnack(res.swallText.title,NotificationTypeEnum.Success);
         this.ngOnInit();
       // this.appointmentDto.DoctorId=this.doctor;
      }
    })
  }
}
