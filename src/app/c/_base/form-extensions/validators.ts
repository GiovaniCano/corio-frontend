import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const password: ValidatorFn = (input: AbstractControl): null | ValidationErrors => {
    /* https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/ */
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")
    return regex.test(input.value) ? null : { password: true }
}

export const alphaNumExtras: ValidatorFn = (input: AbstractControl): null | ValidationErrors => {
    const regex = new RegExp(/^[a-z0-9áéíóúñü.'_-]+$/i)
    return regex.test(input.value) ? null : { alphaNumExtras: true }
}

export function requiredSelect(invalidValue: number | string): ValidatorFn {
    return (control: AbstractControl): null | ValidationErrors  => {
        return control.value == invalidValue ? { required: true } : null
    }
}