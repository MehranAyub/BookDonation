import { Component } from '@angular/core';
import { RouteTransition } from './shared/services/animation/animation';
import { AnimationService } from './shared/services/animation/animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],  
  animations: RouteTransition
})
export class AppComponent {
  title = 'ThemeIntegrationApp';

  constructor(private animSRVC: AnimationService,){
    this.loadScripts();
  }
  loadScripts() {
    const dynamicScripts = [
     'assets/js/main.js',
     'assets/js/app.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  getAnimation() {
    ////console.log(this.animSRVC.getCurrentAnimation());
    return this.animSRVC.getCurrentAnimation();
  }
}
