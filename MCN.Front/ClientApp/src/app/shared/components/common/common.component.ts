import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService, AnimationType } from '../../services/animation/animation.service';

export class CommonComponent  {
  public router: Router;
 constructor(public baseRouter: Router,   private animationService: AnimationService){
    this.router=baseRouter;
  }

  public navigateToRoute(route: string, queryParams?: {}, animationType: AnimationType = AnimationType.slideToLeft) {
    // set animation type
    if (this.animationService) {
      this.animationService.setCurrentAnimationType(animationType);
    }
    // redirect to route
    this.router.navigate([route], { queryParams: queryParams ,replaceUrl: true });

  }
}
