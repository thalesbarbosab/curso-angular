import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dio-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent {

  @Input() titulo : string;
  @Input() formGroup : FormGroup;
  @Input() controlName : string;

  constructor(public validacao : ValidarCamposService) { }

  get formControl() : AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
