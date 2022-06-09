import {AbstractControl, ValidatorFn} from "@angular/forms";


export class NumberValidators {

  static validateRange(min: number, max: number): ValidatorFn {
    return (formControl: AbstractControl): { [key: string]: boolean } | null => {
      if (formControl.value != null && (isNaN(formControl.value) || formControl.value < min || formControl.value > max)) {
        return {'validateRange': true} //invalid
      }
      return null; //valid
    }
  }
}
