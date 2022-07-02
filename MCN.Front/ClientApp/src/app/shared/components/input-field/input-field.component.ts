import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  Directive,
  Optional,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit, OnChanges {
  @Input() inputValue: string;
  @Input() placeholder: string;
  @Input() inputType: string = 'text';
  @Input() inputMask: string = '';
  @Input() isOptional: boolean = false;
  @Input() isOptionalText: string = null;
  @Input() preFixIconPath: string = null;
  @Input() isHalfWidth: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() preFixText: string;
  @Input() postFixText: string;
  @Input() postFixIconPath: string;
  @Input() isNumberOnly: boolean = false;
  @Input() focus: boolean = false;
  @Input() tabindex: number = 0;
  @Input() maxlength: number = 50;
  @Input() forceFocus: boolean = false;
  @Input() pattern: string = "";
  @Input() errorText:string="";
  @Input() isValidData:boolean=true;
  @Input() maxValue:number=0;
  @ViewChild(MatInput) inputField: MatInput;

  @Output() focusOutEventEmitter: EventEmitter<string> = new EventEmitter();

  @Output() inputChange: EventEmitter<any> = new EventEmitter();
  @Output() PostFixTextEvent: EventEmitter<any> = new EventEmitter();
  @Output() PrefixIconEvent: EventEmitter<any> = new EventEmitter();

  onChange(value) { 
      this.inputValue = value;
      this.inputChange.emit({id:this.placeholder,value:this.inputValue});  
  }


  onFocusout(id) {
    this.focusOutEventEmitter.emit(id);
  }
  constructor() {
    this.isOptionalText = 'Optional';
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.forceFocus && this.inputField) {
      this.inputField.focus();
    }
  }
}
