import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {

  constructor() { }

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
   $('.filter-close').on('click', function () {
       if ($('body').hasClass('filter-open') === true) {
         $('body').removeClass('filter-open');
       }
   });
   });
  }

}
