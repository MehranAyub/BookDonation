import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService,LibraryDto } from 'src/app/modules/appointment/services/appointment.service';
import { NotificationTypeEnum, SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.scss']
})
export class BookLibraryComponent implements OnInit {

  bookDto:LibraryDto={Title:'',Link:'',Publisher:'',Author:'',Owner:null}


  constructor(private appointmentService:AppointmentService,private snackbarService:SnackBarService,private router :Router) { }
  Books:any=[];
 error:string="";
  ngOnInit(): void {
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==2){
     this.bookDto.Owner=user.user.id
   
        this.appointmentService.GetLibBooks(this.bookDto.Owner).subscribe((res)=>{
          if(res.data!=null){
            this.Books=res.data;
          
          }
          else{
           
          }
        })
       }
    else{
      this.router.navigateByUrl('/book/search-salon');
    }
  
  }

AddBook(){
  if(this.bookDto.Title!=''&&this.bookDto.Link!=''&&this.bookDto.Publisher!=''&&this.bookDto.Author!=''){
    this.appointmentService.AddLibBook(this.bookDto).subscribe((res)=>{
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
  this.appointmentService.RemoveLibBook(id).subscribe((res)=>{
   
      this.snackbarService.openSnack('Book from Your Library Deleted Successfully',NotificationTypeEnum.Success);
       this.ngOnInit();
     // this.appointmentDto.DoctorId=this.doctor;
    
  })
}

}
