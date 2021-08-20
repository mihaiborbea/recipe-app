import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[appMustMatch]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true },
  ],
})
export class MustMatchDirective implements Validator {
  @Input('appMustMatch') controlToMatch: AbstractControl;

  constructor() {}

  validate(control: AbstractControl): ValidationErrors {
    return this.controlToMatch
      ? mustMatchValidator(this.controlToMatch)(control)
      : null;
  }
}

export function mustMatchValidator(
  matchingControl: AbstractControl
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // return null if controls haven't initialised yet
    if (!control || !matchingControl) {
      return null;
    }
    // return null if another validator has already found an error on the matchingControl
    if (matchingControl.errors) {
      return null;
    }
    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      return { mustMatch: true };
    }
  };
}
