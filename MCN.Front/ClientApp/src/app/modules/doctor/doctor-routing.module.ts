import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/_helpers/auth.guard';
import { DoctorComponent } from './doctor.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { BookLibraryComponent } from './pages/book-library/book-library.component';
import { BookRequestsComponent } from './pages/book-requests/book-requests.component';
import { NewBarberComponent } from './pages/new-barber/new-barber.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterSalonComponent } from './pages/register-salon/register-salon.component';
import { SellerOrdersComponent } from './pages/seller-orders/seller-orders.component';

const routes: Routes = [
  {
    path:'',
    component:DoctorComponent,
    children: [ 
    {
      path: '',
      component: ProfileComponent,
      canActivate:[AuthGuard]

    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate:[AuthGuard]
    }
    ,
    {
      path: 'register-store',
      component: RegisterSalonComponent,
      canActivate:[AuthGuard]
    },    
    {
      path: 'view-books',
      component: NewBarberComponent,
      canActivate:[AuthGuard]
    },  
    {
      path: 'view-orders',
      component: SellerOrdersComponent,
      canActivate:[AuthGuard]
    },
    {
      path: 'appointments',
      component: AppointmentsComponent,
      canActivate:[AuthGuard]
    },
    {
      path: 'book-requests',
      component: BookRequestsComponent,
      canActivate:[AuthGuard]
    },
    
    {
      path: 'book-library',
      component: BookLibraryComponent,
      canActivate:[AuthGuard]
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
