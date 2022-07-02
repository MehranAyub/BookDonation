import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent implements OnInit {

  @Input() label: any;
  @Input() name: string;
  @Input() color: boolean;
  @Input() checked: boolean;
  @Output() onChangeSlideToggle = new EventEmitter(); 

  ngOnInit(): void {
  }

  changeToggle(event) { 
    this.checked = event.checked; 
    this.onChangeSlideToggle.emit(event); 
  }
 

}
