import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {

  @Input() titulo : string;
  @Input() formGroup : FormGroup;
  @Input() controlName : string;
  @Input() opcoes : Array<string>;

  constructor(public validacao : ValidarCamposService) { }

  get formControl() : AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
