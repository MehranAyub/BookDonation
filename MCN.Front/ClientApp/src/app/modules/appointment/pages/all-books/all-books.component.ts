import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationTypeEnum, SnackBarService } from 'src/app/shared/snack-bar.service';
import { AppointmentService, SearchDoctorFilterDto, WishDto } from '../../services/appointment.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent implements OnInit {
 user:any;
  UserId:number;   
  constructor(private snackbarService:SnackBarService,private appointmentService:AppointmentService,private router:Router,private _sanitizer: DomSanitizer) { 
    this.user=JSON.parse(localStorage.getItem('currentUser'));
    if(this.user){
    if(this.user.user.userLoginTypeId==1){
   this.UserId=this.user.user.id;
    }
    else{
      this.router.navigateByUrl('/seller/appointments');
    }}
  }
  ngOnInit(): void {
    this.searchAll();
  }
  Books:any[]=[];
  searchDoctorFilter:SearchDoctorFilterDto={Keyword:'',PageNumber:1,PageSize:10,Author:'',Publisher:'',Title:''};
 wishDto:WishDto={UserId:null,BookId:null}
  searchAll(){
    this.appointmentService.GetAllBooks(this.searchDoctorFilter).subscribe((res)=>{
      console.log(res);
      if(res?.data?.length>0){
        this.Books=res?.data;
    
      }else{
        this.Books=[];
      }
    })
  }

  // bookAppointment(id){
  //   this.router.navigate(['/book/selected-day'], { queryParams: { doctorId: id}});
  // }

  keyUpEvent(value){
    this.searchDoctorFilter.Keyword=value;
    this.searchAll();
  }
orderBook(id){
  this.router.navigate(['/book/checkout'], { queryParams: { bookId: id}});
}
AddToWish(id){
  if(this.user){
  this.wishDto.BookId=id;
  this.wishDto.UserId=this.UserId;
  this.appointmentService.AddToWish(this.wishDto).subscribe((res)=>{
  if(res.data!=null){
    this.snackbarService.openSnack("This book has been added to wishlish",NotificationTypeEnum.Success);
  }
})
  }
  else{
    this.router.navigate(['/account/login']);
  }
}

AdvanceSearch(){
    this.searchAll();
  }
}

