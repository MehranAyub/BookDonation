import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/_helpers/auth.guard';
import { AppointmentComponent } from './appointment.component';
import { AllBooksComponent } from './pages/all-books/all-books.component';
import { BookRuquestsComponent } from './pages/book-ruquests/book-ruquests.component';
import { BookingSuccessComponent } from './pages/booking-success/booking-success.component';
import { LibraryComponent } from './pages/library/library.component';
import { MyRequestsComponent } from './pages/my-requests/my-requests.component';
import { MyWishlistComponent } from './pages/my-wishlist/my-wishlist.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PatientAppointmentsComponent } from './pages/patient-appointments/patient-appointments.component';
import { RequestBookComponent } from './pages/request-book/request-book.component';
import { ReveiwsComponent } from './pages/reveiws/reveiws.component';
import { SearchBarbersComponent } from './pages/search-barbers/search-barbers.component';
import { SearchDoctorComponent } from './pages/search-doctor/search-doctor.component';
import { SelectedDayComponent } from './pages/selected-day/selected-day.component';
import { CheckoutComponent } from './pages/timeslot/checkout.component';

const routes: Routes = [
  {
    path:'',
    component:AppointmentComponent,
    children: [ 
    {
      path: 'search-salon',
      component: SearchDoctorComponent,
      canActivate:[AuthGuard]
    },
    {
      path: '',
      component: AllBooksComponent,
      
    },
    {
      path: 'checkout',
      component: CheckoutComponent,
      canActivate:[AuthGuard]
    },
    {
      path: 'search-books',
      component: SearchBarbersComponent,
      canActivate:[AuthGuard]
    },

    {
      path: 'get-all-books',
      component: AllBooksComponent,
      
    },
    {
      path: 'booking-success',
      component: BookingSuccessComponent,      
      canActivate:[AuthGuard]
    },
    {
      path: 'selected-day',
      component: SelectedDayComponent,      
      canActivate:[AuthGuard]
    },
    {
      path: 'user-orders',
      component: OrdersComponent,      
      canActivate:[AuthGuard]
    }

    ,
    {
      path: 'request-book',
      component: RequestBookComponent,      
      canActivate:[AuthGuard]
    }
    ,
    {
      path: 'book-requests',
      component: BookRuquestsComponent,      
      canActivate:[AuthGuard]
    }
    ,
    {
      path: 'my-requests',
      component: MyRequestsComponent,      
      canActivate:[AuthGuard]
    }
    ,
    {
      path: 'library',
      component: LibraryComponent,      
      canActivate:[AuthGuard]
    }  ,
    {
      path: 'my-wishlist',
      component: MyWishlistComponent,      
      canActivate:[AuthGuard]
    }
    ,
    {
      path: 'reviews',
      component: ReveiwsComponent,      
      canActivate:[AuthGuard]
    }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
