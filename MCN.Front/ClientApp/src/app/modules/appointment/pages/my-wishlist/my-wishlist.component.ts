import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, BarberDto, SearchDoctorFilterDto } from '../../services/appointment.service';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss']
})
export class MyWishlistComponent implements OnInit {
    
  constructor(private appointmentService:AppointmentService,private router:Router) { 
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==1){
    let userId=user.user.id;
    this.search(userId);
    }
    else{
      this.router.navigateByUrl('/seller/appointments');
    }

  }
  ngOnInit(): void {
  }
  Books:any[]=[];



 search(id){
    this.appointmentService.GetWishBooks(id).subscribe((res)=>{
      console.log(res);
      if(res?.data?.length>0){
        this.Books=res?.data;
    
      }else{
        this.Books=[];
      }
    })
  }
  orderBook(id){
    this.router.navigate(['/book/checkout'], { queryParams: { bookId: id}});
  }

}

