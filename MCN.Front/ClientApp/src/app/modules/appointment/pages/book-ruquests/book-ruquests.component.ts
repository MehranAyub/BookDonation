import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as internal from 'stream';
import { AcceptRequest, AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-book-ruquests',
  templateUrl: './book-ruquests.component.html',
  styleUrls: ['./book-ruquests.component.scss']
})
export class BookRuquestsComponent implements OnInit {
aceeptRequest:AcceptRequest={AcceptBy:null,RequestId:null}
UserId:number=null;
NoRequest:string=null;
  constructor(private appointmentService:AppointmentService,private router:Router) { 
    let user=JSON.parse(localStorage.getItem('currentUser'));
    this.UserId=user.user.id;
    
  }
  ngOnInit(): void {
    this.GetBookRequests(this.UserId);
  }
  Requests:any[]=[];
  GetBookRequests(id){
    this.appointmentService.GetBookRequests(id).subscribe((res)=>{
      console.log(res);
      if(res?.data?.length>0){
        this.Requests=res?.data;
    
      }else{
        this.NoRequest="No Any Request For Book by any User."
        this.Requests=[];
      }
    })
  }
  AcceptRequest(id){
    this.aceeptRequest.RequestId=id;
    this.aceeptRequest.AcceptBy=this.UserId;

    this.appointmentService.AcceptRequest(this.aceeptRequest).subscribe((res)=>{
      console.log(res);
   this.ngOnInit();
    })
  }

}
