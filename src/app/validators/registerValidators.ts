import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class RegisterValidators {
  static match(controlName: string, matchControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchControl = group.get(matchControlName);

      if (!control || !matchControl) {
        console.error('not found control')
        return {notFoundControl: true};
      }

      const error =  control.value === matchControl.value ? null : {notMatch: true};

      matchControl.setErrors(error);

      return error;
    }
  }
}
