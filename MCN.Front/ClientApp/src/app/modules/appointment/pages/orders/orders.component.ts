import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppointmentService, FeedDto } from '../../services/appointment.service';
import { SnackBarService, NotificationTypeEnum } from 'src/app/shared/snack-bar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @ViewChild('feed') feed: ElementRef;
  constructor(private appointmentService:AppointmentService,private snackbarService:SnackBarService,private router:Router) { }
  errors:string;
  orders:any=[];
  feedDto:FeedDto={BookId:null,UserId:null,feedback:''}
  ngOnInit(): void {
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==1){
     let userId=user.user.id;
     this.feedDto.UserId=userId;
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

  AddFeedback(id:number,feed:string){
this.feedDto.BookId=id;
this.feedDto.feedback=feed;
console.log(feed)
if(this.feedDto.feedback!=''){
 
  this.appointmentService.AddFeedback(this.feedDto).subscribe((res)=>{
    if(res.data==1){
      this.snackbarService.openSnack("Feedback added successfully",NotificationTypeEnum.Success);
    
    }
  })
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
