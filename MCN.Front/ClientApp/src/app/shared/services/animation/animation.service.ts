import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  constructor() { }

  currentAnimation: any = null;
  currentAnimationId: number = -1;
  public animations: any;

  slideToLEFT() { this.setCurrentAnimation(AnimationType.slideToLeft); }
  slideToRIGHT() { this.setCurrentAnimation(AnimationType.slideToRight); }
  slideToTOP() { this.setCurrentAnimation(AnimationType.slideToTop); }
  slideToBOTTOM() { this.setCurrentAnimation(AnimationType.slideToBottom); }

  private setCurrentAnimation(animationType: AnimationType) {
    var nextAnimation = "";
    var isDuplicate = false;
    let animationId  = animationType;
    switch (animationType) {
      case AnimationType.slideToLeft:
        nextAnimation = "slideToLeft";
        break;
      case AnimationType.slideToRight:
        nextAnimation = "slideToRight";
        break;
      case AnimationType.slideToTop:
        nextAnimation = "slideToTop";
        break;
      case AnimationType.slideToBottom:
        nextAnimation = "slideToBottom";
        break;
      default:
        break;
    }
    if (this.currentAnimation && (this.currentAnimation.indexOf("Duplicate") > -1)) {
      isDuplicate = true;
    }

    /* add duplicate if previous animation otherwise animation will not work */
    if ((animationId == this.currentAnimationId) && !isDuplicate) {
      nextAnimation = nextAnimation + "Duplicate";
    }
    this.currentAnimation = nextAnimation;
    this.currentAnimationId = animationId;
  }
  getCurrentAnimation() {
    return this.currentAnimation;
  }

  setCurrentAnimationType(animationType: AnimationType) {
    this.setCurrentAnimation(animationType);
  }

}

export enum AnimationType {
  none = 0,
  slideToLeft = 1,
  slideToRight = 2,
  slideToTop = 3,
  slideToBottom = 4,
}
