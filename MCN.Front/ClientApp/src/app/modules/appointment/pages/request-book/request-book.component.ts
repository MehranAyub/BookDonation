import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, OrderDto, RequestDto } from '../../services/appointment.service';

@Component({
  selector: 'app-request-book',
  templateUrl: './request-book.component.html',
  styleUrls: ['./request-book.component.scss']
})

export class RequestBookComponent implements OnInit {
 
  requestDto:RequestDto={Title:'',AuthorName:'',PublisherName:'',Address:'',RequestBy:null,Edition:''}
  BuyerName:string="";
  constructor(private router:Router,private appointmentService:AppointmentService) {
    
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==1){
      this.BuyerName=user.user.firstName+" "+user.user.lastName;
      this.requestDto.RequestBy=user.user.id;
    }
    else{
      this.router.navigate(['/seller/appointments']);
    }
   
     
   
   }
formError:string="";
PlaceOrder(){
if(this.requestDto.Title!=''||this.requestDto.Address!=''||this.requestDto.AuthorName!=''||this.requestDto.PublisherName!=''||this.requestDto.Edition!=''){

  this.appointmentService.RequestBook(this.requestDto).subscribe((res)=>{
    if(res.data){
      console.log(res.data)
      this.router.navigate(['/book/booking-success']);
    }
  })
}
else{
  this.formError="Please fill all fields correctly before requesting Book";
 
}
   }
  //  registerAppointment(){
  //   console.log('appoint method called');
  //   console.log(this.appointmentDto);
  //    this.appointmentService.RegisterAppointment(this.appointmentDto).subscribe((res)=>{
  //      if(res?.data){
  //        this.appointmentDto.AppointmentId=(res.data.id || 0);
  //        this.router.navigate(['/book/booking-success'], { queryParams: { name: this.doctor?.firstName+' '+this.doctor?.lastName }});
  //      }
  //    })
  //  }
  ngOnInit(): void {
  }

}

