import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

// Name     -  Max length 30
// Email    - Basic email validation
// Phone Number - only accept 10 digit numeric only
// User Type - Selectbox -> Employee, Non-Employee
// Password  
// Conform Password
// Submit Button - It should only enabled after all fields are valid.
  registerForm = this.formBuilder.group({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [Validators.required, Validators. pattern("^[0-9]{10}$")]),
    userType: new FormControl('employee', [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  }, {validator: this.passwordConfirming});
  
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(x => {
      console.log(this.registerForm.getRawValue());
    });
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {invalid: true};
    }
  }

  reset() {
    this.registerForm.reset();
  }

  get isFormValid() {
    return this.registerForm.valid;
  }

  signIn() {
    this.registerForm.markAllAsTouched();
    var ids: any[] = JSON.parse(sessionStorage.getItem('id'));
    var passes: any[] = JSON.parse(sessionStorage.getItem('pass'));
    var roles: any[] = JSON.parse(sessionStorage.getItem('roles'));

    ids.push((ids.length + 1).toString());
    passes.push(this.registerForm.value.password);
    roles.push(this.registerForm.value.userType);

    sessionStorage.setItem('id', JSON.stringify(ids));
    sessionStorage.setItem('pass',JSON.stringify(passes));
    sessionStorage.setItem('roles',JSON.stringify(roles));
    this.router.navigate(['']);
  }
  
  isInvalidForm() {
    var errors: any[] = [];
    for (var key in this.registerForm.controls){
      var control: AbstractControl = this.registerForm.controls[key];
      if (!control.pristine && control.errors) {
        errors.push(key + " - " + Object.keys(control.errors));
      }
    }
    return errors;
  }

}
