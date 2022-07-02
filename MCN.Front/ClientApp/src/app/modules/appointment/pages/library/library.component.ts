import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, BarberDto, SearchDoctorFilterDto } from '../../services/appointment.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
    
  constructor(private activatedRoute:ActivatedRoute,private appointmentService:AppointmentService,private router:Router,private _sanitizer: DomSanitizer) { 
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==1){
      activatedRoute.queryParams.subscribe(params => {
        let storeId = (params['storeId'] || 0);
        let OwnerId = (params['OwnerId'] || 0);
        if(storeId>0){
          this.GetSalon(storeId);
          this.search(OwnerId);
         
        }
      
      });
    }
    else{
      this.router.navigateByUrl('/seller/appointments');
    }


 

  }
  ngOnInit(): void {



  }
  Books:any[]=[];
  Store:any;
  eror:string="";
  search(id){
    this.appointmentService.GetLibBooks(id).subscribe((res)=>{
      console.log(res);
      if(res.data!=null){
        this.Books=res?.data;
    
      }else{
        this.eror="This Store has not any book in thier Library, please visit another one"
        this.Books=[];
      }
    })
  }
  orderBook(id){
    this.router.navigate(['/book/checkout'], { queryParams: { bookId: id}});
  }

  GetSalon(id){
    this.appointmentService.Salon(id).subscribe((res)=>{  
        this.Store=res?.data;
       
    })
  }

}

