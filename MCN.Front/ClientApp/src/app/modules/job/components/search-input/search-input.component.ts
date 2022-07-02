import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

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
   });
  }

}
