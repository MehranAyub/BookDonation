import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var $:any;
declare var Swiper:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  constructor() { }

  ngOnInit(): void { 


  }

  ngAfterViewInit(){
    $(document).ready(function(){
            var swiper1 = new Swiper(".categoriesswiper", {
                slidesPerView: "auto",
                spaceBetween: 12,
            });

             var swiper2 = new Swiper(".offerslides", {
                slidesPerView: "1",
                spaceBetween: 10,
                pagination: {
                    el: ".pagination-offerslides",
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
            });

            var swiper3 = new Swiper(".trendingslides", {
                slidesPerView: "auto",
                spaceBetween: 26,
            });

            var swiper4 = new Swiper(".shopslides", {
                slidesPerView: "auto",
                spaceBetween: 0,
            });

            var swiper5 = new Swiper(".imageswiper", {
                slidesPerView: "1",
                spaceBetween: 12,
                pagination: {
                    el: ".imageswiper-pagination",
                },
            });
            var swiper6 = new Swiper(".shopslides", {
                slidesPerView: "auto",
                spaceBetween: 0,
            });
  });
}


}
