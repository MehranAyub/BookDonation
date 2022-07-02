import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService, BarberDto, SearchDoctorFilterDto } from '../../services/appointment.service';

@Component({
  selector: 'app-search-barbers',
  templateUrl: './search-barbers.component.html',
  styleUrls: ['./search-barbers.component.scss']
})
export class SearchBarbersComponent implements OnInit {
    
  constructor(private activatedRoute:ActivatedRoute,private appointmentService:AppointmentService,private router:Router,private _sanitizer: DomSanitizer) { 
    let user=JSON.parse(localStorage.getItem('currentUser'));
    if(user.user.userLoginTypeId==1){
      activatedRoute.queryParams.subscribe(params => {
        // this.isFromCashScreen = (params['isFromCashScreen'] == 'true');
        let salonId = (params['salonId'] || 0);
        let OwnerId = (params['OwnerId'] || 0);
        if(salonId>0){
         // this.registerAppointment(doctorId);
          this.GetSalon(salonId);
          this.search(OwnerId);
          this.barberDto.SalonId=salonId;
        }
      
      });
    }
    else{
      this.router.navigateByUrl('/seller/appointments');
    }


 

  }
  ngOnInit(): void {



  }
  Barbers:any[]=[];
  Salon:any;
  barberDto:BarberDto={ID:0,FirstName:'',LastName:'',Logo:'',LoginType:1,Phone:'',SalonId:0,Description:'',Address:''}
  searchDoctorFilter:SearchDoctorFilterDto={Keyword:'',PageNumber:1,PageSize:10,Author:'',Publisher:'',Title:''};
 



 search(id){
    this.appointmentService.GetBooks(id).subscribe((res)=>{
      console.log(res);
      if(res?.data?.length>0){
        this.Barbers=res?.data;
    
      }else{
        this.Barbers=[];
      }
    })
  }
  orderBook(id){
    this.router.navigate(['/book/checkout'], { queryParams: { bookId: id}});
  }

  GetSalon(id){
    this.appointmentService.Salon(id).subscribe((res)=>{  
        this.Salon=res?.data;
        console.log(this.Salon)
    })
  }

}
