import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appMustMatch]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true },
  ],
})
export class MustMatchDirective implements Validator {
  @Input('appMustMatch') appMustMatch: string;

  constructor() {}

  validate(control: AbstractControl): ValidationErrors {
    let confirmPassword = control;

    let password = control.root.get(this.appMustMatch);

    // return null if controls haven't initialised yet
    if (!password.value || !confirmPassword.value) {
      return null;
    }

    // return null if another validator has already found an error on the matchingControl
    if (password.errors) {
      return null;
    }

    // set error on matchingControl if validation fails
    if (password.value && password.value != confirmPassword.value) {
      return { appMustMatch: false };
    }

    return null;
  }
}
