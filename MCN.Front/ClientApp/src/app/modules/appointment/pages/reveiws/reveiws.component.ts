import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-reveiws',
  templateUrl: './reveiws.component.html',
  styleUrls: ['./reveiws.component.scss']
})
export class ReveiwsComponent implements OnInit {
 
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private appointmentService:AppointmentService) {
    
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==1){
      
      
    }
    else{
      this.router.navigate(['/seller/appointments']);
    }
    activatedRoute.queryParams.subscribe(params => {

      let bookId = (params['bookId'] || 0);

   this.getBook(bookId);
     this.GetReviews(bookId);
     
    });
   }
   
   book:any={};
   reviews:any={}
   getBook(id){
    this.appointmentService.GetBook(id).subscribe((res)=>{
      if(res.data){
        this.book=res.data;
      }
    })
   }
   GetReviews(id){
  this.appointmentService.GetReviews(id).subscribe((res)=>{
    if(res.data){
      console.log(res.data)
this.reviews=res.data;
    }
  })
   }

  ngOnInit(): void {
  }

}
