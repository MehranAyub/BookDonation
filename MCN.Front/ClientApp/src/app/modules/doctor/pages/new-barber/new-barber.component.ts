import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AppointmentService, BookDto } from 'src/app/modules/appointment/services/appointment.service';
import { NotificationTypeEnum, SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-new-barber',
  templateUrl: './new-barber.component.html',
  styleUrls: ['./new-barber.component.scss']
})
export class NewBarberComponent implements OnInit {

  bookDto:BookDto={ID:0,Title:'',Cover:'',Isbn:null,Price:null,Copies:null,PubName:'',AuthName:'',CreatedBy:0,StoreId:0}


  constructor(private appointmentService:AppointmentService,private snackbarService:SnackBarService,private router :Router) { }
  Books:any=[];
 error:string="";
  ngOnInit(): void {
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==2){
  
      console.log(user.user.loginType)
     this.bookDto.StoreId=user.user.salonId;
     this.bookDto.CreatedBy=user.user.id
     if(this.bookDto.StoreId==null){
       this.appointmentService.GetSalonID(user.user.id).subscribe((res)=>{
this.bookDto.StoreId=res;
console.log(this.bookDto.StoreId)
        this.appointmentService.GetBooks(this.bookDto.CreatedBy).subscribe((res)=>{
          if(res.statusCode==200){
            this.Books=res.data;
            console.log(this.Books);
          }
        })
       })
     }
    
else{
console.log("else hitted")
  this.appointmentService.GetBooks(this.bookDto.CreatedBy).subscribe((res)=>{
    if(res.statusCode==200){
      this.Books=res.data;
    }
  })
}

    }

    else{
      this.router.navigateByUrl('/book/search-salon');
    }
  
  }

RegisterBarber(){
  if(this.bookDto.Title!=''&&this.bookDto.Isbn!=0&&this.bookDto.Price!=0 &&this.bookDto.Copies!=0&&this.bookDto.PubName!=''&&this.bookDto.AuthName!=''){
    this.appointmentService.AddBook(this.bookDto).subscribe((res)=>{
if(res.statusCode==200){
console.log(res.data);
this.snackbarService.openSnack("New Book added successfully",NotificationTypeEnum.Success);
      this.ngOnInit();      
}
    })
  }
  else{
this.error="Please fill all fields";
  }

}
RemoveBook(id){
  this.appointmentService.RemoveBook(id).subscribe((res)=>{
   
      this.snackbarService.openSnack('Book and its all orders Deleted Successfully',NotificationTypeEnum.Success);
       this.ngOnInit();
     // this.appointmentDto.DoctorId=this.doctor;
    
  })
}

}
