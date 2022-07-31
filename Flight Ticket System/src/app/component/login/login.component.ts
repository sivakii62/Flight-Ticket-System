import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    id: new FormControl(''),
    password: new FormControl(''),
  });
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    let ids = (JSON.parse(sessionStorage.getItem('id')) as any[]);
    let passes = (JSON.parse(sessionStorage.getItem('pass')) as any[]);
    let roles = (JSON.parse(sessionStorage.getItem('roles')) as any[]);
    if (ids.includes(this.loginForm.value.id)
      && passes[ids.indexOf(this.loginForm.value.id)] === this.loginForm.value.password
      && roles[ids.indexOf(this.loginForm.value.id)] === 'employee') {
        this.router.navigate(['FlightSearch']);
        sessionStorage.setItem('currentUserId', this.loginForm.value.id);
    } else {
      this.router.navigate(['bad-creds']);
    }
  }

  signIn() {
    this.router.navigate(['register']);
  }
}
