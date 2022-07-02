import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationTypeEnum, SnackBarService } from 'src/app/shared/snack-bar.service';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {

  constructor(private appointmentService:AppointmentService,private snackbarService:SnackBarService,private router:Router) { }
  errors:string;
  requests:any=[];
  ngOnInit(): void {
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==1){
     let userId=user.user.id;
     this.appointmentService.GetUserRequests(userId).subscribe((res)=>{
      if(res.data!=null){
        this.requests=res.data;
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

  CancelRequest(id){
    this.appointmentService.CancelRequest(id).subscribe((res)=>{
      if(res.data){
        this.snackbarService.openSnack(res.swallText.title,NotificationTypeEnum.Success);
         this.ngOnInit();
       // this.appointmentDto.DoctorId=this.doctor;
      }
    })
  }
}
