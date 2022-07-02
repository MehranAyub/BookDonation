import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { RegisterSalonComponent } from './pages/register-salon/register-salon.component';
import { NewBarberComponent } from './pages/new-barber/new-barber.component';
import { SellerOrdersComponent } from './pages/seller-orders/seller-orders.component';
import { AppointmentModule } from '../appointment/appointment.module';
import { BookRequestsComponent } from './pages/book-requests/book-requests.component';
import { BookLibraryComponent } from './pages/book-library/book-library.component';


@NgModule({
  declarations: [ProfileComponent,DoctorComponent,AppointmentsComponent, RegisterSalonComponent, NewBarberComponent, SellerOrdersComponent, BookRequestsComponent, BookLibraryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorRoutingModule,
    AppointmentModule
  ]
})
export class DoctorModule { }
