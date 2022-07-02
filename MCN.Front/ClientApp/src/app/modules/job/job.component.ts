import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $(document).ready(function(){
      /* Filter button */
   $('.filter-close').on('click', function () {
       if ($('body').hasClass('filter-open') === true) {
         $('body').removeClass('filter-open');
       }
   });
   });
  }

}
