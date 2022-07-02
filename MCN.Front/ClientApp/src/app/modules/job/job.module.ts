import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JobComponent } from './job.component';
import { FilterRightNavbarComponent } from './components/filter-right-navbar/filter-right-navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StyleComponent } from './pages/style/style.component';
import { HomeComponent } from './pages/home/home.component';
// import { GoogleMapsModule } from '@angular/google-maps';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchInputByGoogleMapComponent } from './components/search-input-by-google-map/search-input-by-google-map.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { TagInputModule } from 'ngx-chips';

TagInputModule.withDefaults({
  tagInput: {
      placeholder: 'Select Skills or Interests',
  }
});
@NgModule({
  declarations: [
    DashboardComponent,
    JobComponent,
    FilterRightNavbarComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    StyleComponent,
    HomeComponent,
    SearchInputComponent,
    SearchInputByGoogleMapComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule, 
    TagInputModule,
    SharedModule,
  ]
})
export class JobModule { }
