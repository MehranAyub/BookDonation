import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from '../appointment/appointment.component';
import { SearchDoctorComponent } from './pages/search-doctor/search-doctor.component';
import { CheckoutComponent } from './pages/timeslot/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingSuccessComponent } from './pages/booking-success/booking-success.component';
import { PatientAppointmentsComponent } from './pages/patient-appointments/patient-appointments.component';
import { SelectedDayComponent } from './pages/selected-day/selected-day.component';
import { SearchBarbersComponent } from './pages/search-barbers/search-barbers.component';
import { AllBooksComponent } from './pages/all-books/all-books.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RequestBookComponent } from './pages/request-book/request-book.component';
import { BookRuquestsComponent } from './pages/book-ruquests/book-ruquests.component';
import { MyRequestsComponent } from './pages/my-requests/my-requests.component';
import { LibraryComponent } from './pages/library/library.component';
import { MyWishlistComponent } from './pages/my-wishlist/my-wishlist.component';
import { ReveiwsComponent } from './pages/reveiws/reveiws.component';


@NgModule({
  declarations: [AppointmentComponent, SearchDoctorComponent, CheckoutComponent, BookingSuccessComponent, PatientAppointmentsComponent, SelectedDayComponent, SearchBarbersComponent, AllBooksComponent, OrdersComponent, RequestBookComponent, BookRuquestsComponent, MyRequestsComponent, LibraryComponent, MyWishlistComponent, ReveiwsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppointmentRoutingModule
  ],
  exports: [
BookRuquestsComponent
  ]
})
export class AppointmentModule { }
