import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/components/common/common.component';
import { AnimationService, AnimationType } from 'src/app/shared/services/animation/animation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends CommonComponent implements OnInit {

  activItem:number=1;
  constructor(_router:Router,animationService:AnimationService) {
    super(_router,animationService);
   }

  ngOnInit(): void {
  }

  NavItemEvent(value:number){
    this.activItem=value;
    if(value==1){
      this.navigateToRoute('/job/home',null,AnimationType.slideToTop);
    }
    else if(value==4){
      this.navigateToRoute('/job/style',null,AnimationType.slideToTop);

    }
    else if(value==3){      
      this.navigateToRoute('/job/dashboard',null,AnimationType.slideToTop);
    }
  }
}
