import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, OrderDto } from '../../services/appointment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
 
  orderDto:OrderDto={BookId:null,OrderBy:null,Copies:null,Address:'',Phone:'',Price:null,BookCreatedBy:null}
  BuyerName:string="";
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private appointmentService:AppointmentService) {
    
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==1){
      
      this.orderDto.OrderBy=user.user.id;
      this.BuyerName=user.user.firstName+" "+user.user.lastName;
    }
    else{
      this.router.navigate(['/seller/appointments']);
    }
    activatedRoute.queryParams.subscribe(params => {
      // this.isFromCashScreen = (params['isFromCashScreen'] == 'true');
      let bookId = (params['bookId'] || 0);

this.orderDto.BookId=bookId;
     
      if(bookId>0){
      //  this.registerAppointment(doctorId);
        this.getBook(bookId);
      }
    });
   }
   
   book:any={};
   getBook(id){
    this.appointmentService.GetBook(id).subscribe((res)=>{
      if(res.data){
        this.book=res.data;
      }
    })
   }
   quantityError:string="";
quantityCheck(){
if(this.orderDto.Copies>this.book.copiesInStock){
this.quantityError="Please Add Quantity between 0 to "+this.book.copiesInStock;
}
else{
  this.quantityError="";
}
}
formError:string="";
   PlaceOrder(){
if(this.orderDto.Phone==''||this.orderDto.Address==''||this.orderDto.Copies>this.book.copiesInStock){
  this.formError="Please fill all fields correctly before placing order";
}
else{
  this.orderDto.Price=this.book.price;
  this.orderDto.BookCreatedBy=this.book.createdBy
  this.appointmentService.OrderBook(this.orderDto).subscribe((res)=>{
    if(res.data){
      console.log(res.data)
      this.router.navigate(['/book/booking-success'], { queryParams: {name: this.book.title}});
    }
  })
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
