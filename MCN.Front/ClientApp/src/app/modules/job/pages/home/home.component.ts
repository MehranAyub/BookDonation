import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { Marker, SearchFilter, SearchResultDto } from '../../models/mapService';
import { JobService } from '../../service/jobService';
declare var $:any;

const marker:Marker = {
  position: {
    lat: 37.3382,
    lng: -121.8863,
  },
  title: '',
  options: {
    animation: google.maps.Animation.DROP,
    draggable:false,
    icon: {
      url: 'assets/img/PickPin.svg',
    },
  },
  icon:'assets/img/PickPin.svg',
  data:{id:0,title:'',gender:'',email:'',distance:0,lastName:'',firstName:'',longitude:0,latitude:0}
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  pinPositon: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  
  zoom = 12;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    panControl: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    zoom:12,
    maxZoom:18,
    center: new google.maps.LatLng(37.3382, -121.8863),
    
  };
  public markers:Marker[] = [];
  public latLongs:SearchResultDto[]=[];
  // =[{firstName:'Niazi',lastName:'Town',lat:33.599239344482179,long:73.009821019136709},{firstName:'Misrial',lastName:'Chowk',lat:33.602050353186954,long:72.98370354939469}];

  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  imageBounds: google.maps.LatLngBoundsLiteral = {
    east: 10,
    north: 10,
    south: -10,
    west: -10,
  };
  vertices: google.maps.LatLngLiteral[] = [];
  
  constructor(private _jobService:JobService) { 

    
  }

  ngOnInit(): void {
    $(document).ready(function(){
      /* Filter button */
      $('.filter-btn').on('click', function () {
       if ($('body').hasClass('filter-open') === true) {
         $('body').removeClass('filter-open');
       } else {
         $('body').addClass('filter-open');
       } 
       return false;
   });
   });

   
   navigator?.geolocation?.getCurrentPosition((position) => {
    this.center = {
      lat: position?.coords?.latitude,
      lng: position?.coords?.longitude,
    }
    this.pinPositon = {
      lat: position?.coords?.latitude,
      lng: position?.coords?.longitude,
    } 
    this.setPinLocation();
  });
  // this.loadLatLng()
  }

  setPinLocation(){
    const bounds = new google.maps.LatLngBounds();
    const mark = { ...marker };
    mark.position=this.center;
    mark.data={latitude:this.center.lat,longitude:this.center.lng,firstName:'Pin',lastName:'Point',distance:0,email:'',gender:'',id:0,title:''}
    bounds.extend(mark.position);
    this.markers.push(mark);
    this.center = {
      lat: bounds?.getCenter()?.lat(),
      lng: bounds?.getCenter()?.lng(),
    };
    console.log(this.map);
    this.map.googleMap.fitBounds(bounds);
    this.map.googleMap.setZoom(12);
  }
  loadLatLng(){
    this.markers=[];
    this.vertices=[];
    const bounds = new google.maps.LatLngBounds();    
   let pinPointData= {latitude:this.center.lat,longitude:this.center.lng,firstName:'Pin',lastName:'Point',distance:0,email:'',gender:'',id:0,title:''};
    this.markers.push({position:this.pinPositon,title:'Pin Point',label:{color:'Yellow',text:'label'},options:{
      animation: google.maps.Animation.DROP,
      draggable:false,
      icon:'assets/img/apple-small.png'
    },data:pinPointData});
    this.latLongs.forEach((item)=>{

      this.markers.push({
        position: {
          lat: item.latitude,
          lng: item.longitude,
        },
        title:item.title,
        label: {
          color: 'red',
          text: ''
        },
        data:item,
        options: {
          animation: google.maps.Animation.DROP,
          draggable:false,
          icon:'assets/img/PickPin.svg'
        },
      }
      ); 
      this.vertices.push({lat:this.pinPositon.lat,lng:this.pinPositon.lng});
      this.vertices.push({lat:item.latitude,lng:item.longitude});
     })
console.log('vertices=> ',this.vertices);
     this.markers.forEach((marker) => {
      bounds.extend(marker.position);
    });
    this.center = {
      lat: bounds?.getCenter()?.lat(),
      lng: bounds?.getCenter()?.lng(),
    };
    this.map.zoom=6;
    this.map.fitBounds(bounds); 
    this.map.panToBounds(bounds);
  }

  infoContent = ''
  openInfoWindow(marker: MapMarker,item:Marker) {
    console.log(item);
    this.infoContent ='1- '+item?.data?.firstName +' '+ item?.data?.lastName+'<br/>2- Title:- <b>'+item?.data?.title +'</b><br/>3- Email <b>'+item.data?.email+'</b><br/>4- Distance (km) <b>'+item?.data?.distance.toFixed(2)+'</b><br/>5- Position <b>'+item.data.latitude +' '+item?.data?.longitude+'</b></br></br>';
    this.info.open(marker);

    
  }

  searchCriteria(event:SearchFilter){
    console.log(event);
    this.pinPositon={lat:event.SearchLat,lng:event.SearchLng};
    this._jobService.GetResults(event).subscribe((res)=>{
      console.log(res);
      this.latLongs=res;
      this.loadLatLng();
    })
  }

  GoToProfile(){
    console.log("User's Profile");
  }
}
