import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/shared/services/common/api.service';
import * as internal from 'stream';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private  url="Search/";

 
  paramss:HttpParams = new HttpParams();
  
    constructor(private apiService: ApiService) { }
  

  GetDoctors(model:SearchDoctorFilterDto): Observable<any> {
    // let model:any={Keyword:keyword,PageNumber:1,PageSize:10}
    return this.apiService.post('Appointments/SearchDoctor',model);
}

RegisterAppointment(model:AppointmentDto): Observable<any> {
  return this.apiService.post('Appointments/RegisterAppointment',model);
}

RegisterTimeSlot(model:AppointmentDto): Observable<any> {
  return this.apiService.post('Appointments/RegisterTimeSlot',model);
}
FindSlots(model:AppointmentDto): Observable<any> {
  return this.apiService.post('Appointments/FindSlots',model);
}
GetBook(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetBook',this.paramss);
}

GetSalon(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetSalon',this.paramss);
}

Salon(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/Salon',this.paramss);
}
GetProfileImg(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetProfileImg',this.paramss);
}
GetSpecialities(): Observable<any> { 
  return this.apiService.get('Appointments/GetSpecialities');
}
GetBarbers(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetBarbers',this.paramss);
}
GetBooks(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetBooks',this.paramss);
}
GetWishBooks(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetWishBooks',this.paramss);
}
GetAllBooks(model:SearchDoctorFilterDto):Observable<any>{
  return this.apiService.post('Users/GetAllBooks',model);
}
OrderBook(model:OrderDto):Observable<any>{
  return this.apiService.post('Users/OrderBook',model);
}
RequestBook(model:RequestDto):Observable<any>{
  return this.apiService.post('Users/RequestBook',model);
}
SearchBooks(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/SearchBooks',this.paramss);
}

SaveSpecialities(model:SpecialitiesDto): Observable<any> {
  return this.apiService.post('Appointments/SaveSpecialities',model);
}
UpdateUser(model:AppointmentDto): Observable<any> {
  return this.apiService.post('Appointments/UpdateUser',model);
}

RegisterSalon(model:SalonDto): Observable<any> {
  return this.apiService.post('Users/RegisterSalon',model);
}
AddBook(model:BookDto): Observable<any> {// have to add this API.
  return this.apiService.post('Users/AddBook',model);
}
FileUpload (model:FormData): Observable<any> {
  return this.apiService.post('Users/FileUpload',model);
}
GetAppointments(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Appointments/GetAppointments',this.paramss);
}

GetPatientAppointments(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Appointments/GetPatientAppointments',this.paramss);
}
CancelAppointment(id): Observable<any> {
  return this.apiService.post('Appointments/CancelAppointment',id);
}

OrderAction(model:OrderAction): Observable<any> {
  return this.apiService.post('Users/OrderAction',model);
}
GetSalonID(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetSalonID',this.paramss);
}
RemoveBook(id): Observable<any> {
  return this.apiService.post('Users/RemoveBook',id);
}
RemoveLibBook(id): Observable<any> {
  return this.apiService.post('Users/RemoveLibraryBook',id);
}
GetStoreList(model:SearchDoctorFilterDto):Observable<any>{
  return this.apiService.post('Appointments/GetStoreList',model);
}

GetUserOrders(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetUserOrders',this.paramss);
}
GetSellerOrders(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetSellerOrders',this.paramss);
}
GetBookRequests(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetBookRequests',this.paramss);
}

AcceptRequest(model:AcceptRequest):Observable<any>{
  return this.apiService.post('Users/RequestAccepted',model);
}
GetUserRequests(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetUserRequests',this.paramss);
}

CancelRequest(id): Observable<any> {
  return this.apiService.post('Users/CancelRequest',id);
}
GetLibBooks(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetLibBooks',this.paramss);
}
AddLibBook(model:LibraryDto): Observable<any> {// have to add this API.
  return this.apiService.post('Users/AddLibraryBook',model);
}
AddToWish(model:WishDto):Observable<any>{
  return this.apiService.post('Users/AddToWishlist',model);
}
AddFeedback(model:FeedDto):Observable<any>{
  return this.apiService.post('Users/Feedback',model);
}
GetReviews(id): Observable<any> {
  this.paramss = new HttpParams().set('id',id)
  return this.apiService.get('Users/GetReviews',this.paramss);
}

}

export interface SearchDoctorFilterDto{
  Keyword :string
  Title:string 
  Author:string
  Publisher:string
  PageNumber :number
  PageSize:number
}

export interface AppointmentDto{
   DoctorId  :number
    PatientId :number
    Date :Date
    SelectTimeSlot :string
   AppointmentId :number

   firstName:string;
   lastName:string;
   phone:string;
   email:string;
   description?:string
   doctorId?:number;
   userLoginTypeId?:number
}
export interface SalonDto{
ID:number,
Address:string,
Introduction:string,
Logo:string,
  Name:string;
  About?:string
  RegisterBy?:number;
  OwnerName:string;
  OwnerEmail:string;
}

export interface BarberDto{
  ID:number,
  Logo:string,
    FirstName:string;
    LastName:string;
    Phone:string;
    SalonId:number;
    Description:string;
    LoginType:number;
    Address:string;
  }
  export interface BookDto{
    ID:number,
    Title:string,
    Cover:string,
      Isbn:number;
      Price:number;
      Copies:number;
      PubName:string;
      AuthName:string;
      CreatedBy:number;
      StoreId:number;
    }
    export interface LibraryDto{
     
        Title:string,
        Link:string;
        Publisher:string;
        Author:string;
        Owner:number;
       
      }



    export interface OrderDto{
        BookId:number;
        OrderBy:number;
        Copies:number;
        Address:string;
        Phone:string;
        Price:number;
        BookCreatedBy:number;
      }
      export interface RequestDto{
        Title:string;
        PublisherName:string;
        AuthorName:string;
        RequestBy:number;
        Edition:string;
        Address:string;
       
      }
    
      export interface WishDto{
        BookId:number,
        UserId:number
         }
      export interface OrderAction{
     id:number,
     action:number
      }
      export interface AcceptRequest{
        RequestId:number,
        AcceptBy:number
         }
         export interface FeedDto{
          BookId:number,
          UserId:number,
          feedback:string
           }


export class SpecialitiesDto
{
    DoctorSpecialitiesDtos:any[]

}

export class DoctorSpecialitiesDto{
   DoctorId:number
   SpecialistId:number
}

export interface specialities{
  id:number;
  name:string;
  isChecked:boolean;
}
