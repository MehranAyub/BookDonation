import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { InterestDto, SearchFilter } from '../../models/mapService';
import { JobService } from '../../service/jobService';
import { SearchInputByGoogleMapComponent } from '../search-input-by-google-map/search-input-by-google-map.component';
declare var $:any;
@Component({
  selector: 'app-filter-right-navbar',
  templateUrl: './filter-right-navbar.component.html',
  styleUrls: ['./filter-right-navbar.component.scss']
})
export class FilterRightNavbarComponent implements OnInit {
  @Output() searchCriteria:EventEmitter<any>=new EventEmitter();

  autoTicks = true;
  disabled = false;
  invert = false;
  max = 500;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;
  public searchFilter:SearchFilter={Keyword:'',MinDistance:0,MaxDistance:500,Interests:[],SearchLat:0,SearchLng:0,isDistance:true};
  constructor(private _bottomSheet: MatBottomSheet,private _jobService:JobService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
        this.searchFilter.SearchLat= position.coords.latitude;
        this.searchFilter.SearchLng= position.coords.longitude;
      });


    $(document).ready(function(){
   $('.filter-close').on('click', function () {
       if ($('body').hasClass('filter-open') === true) {
         $('body').removeClass('filter-open');
       }
   });
   });
  }

  inputChange(event){
    console.log(event);
    if(event?.id=='Max'){
      this.searchFilter.MaxDistance=event.value;
    }
    else if(event?.id=='Keywords'){
      this.searchFilter.Keyword=event.value;
    }
  }

  private _bottomSheetDismissSubscription: Subscription;
  private _bottomSheetRef: MatBottomSheetRef;
  // actionConfirmData: ActionConfirmModel = {
  //   acceptLabel: "Login",
  //   rejectLabel: "",
  //   id: "verifyPin",
  //   heading: "Account found",
  //   description: "An account already exists for this phone number."
  // }

  setPinLocation(): void {
    this._bottomSheetRef = this._bottomSheet.open(SearchInputByGoogleMapComponent, {
      data: null,
      disableClose: false,
      panelClass: 'bottomsheet-container'
    });

    this._bottomSheetDismissSubscription = this._bottomSheetRef
      .afterDismissed()
      .subscribe((response: any) => {
        console.log(response);
        if (response?.code =='200' ) {
          this.searchFilter.SearchLat=response?.data?.geometry?.location?.lat();
          this.searchFilter.SearchLng=response?.data?.geometry?.location?.lng();
        }
      });
  }

  onChangeSlideToggle(event){
    this.searchFilter.isDistance=!!event?.checked?true:false;
  }
  filterCriteria(event){
    this.searchFilter.Interests=this.interests;
    this.searchCriteria.emit(this.searchFilter);
    $('body').removeClass('filter-open');
  }
  inputInterestItems:InterestDto[]=[];
  interests:number[]=[];
  dropdownItems:InterestDto[]=[];
  onTextChange(event){
    console.log(event);
    this._jobService.GetInterestList(event).subscribe((res)=>{
      console.log(res);
      this.dropdownItems=res;
    });
  }
  onItemAdded(event){
    this.interests=[];
    console.log(this.inputInterestItems);
    this.inputInterestItems.forEach((res)=>{
      this.interests.push(res.id);
    });
  }

  GetInterestList(event:SearchFilter){

  }

  ngOnDestroy(): void {
    this._bottomSheetRef = null;
    if (this._bottomSheetDismissSubscription) {
      this._bottomSheetDismissSubscription.unsubscribe();
    }
  }

}
