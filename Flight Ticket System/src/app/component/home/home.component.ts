import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkUserIsLoggedIn(): boolean {
    return (JSON.parse(sessionStorage.getItem('id')) as any[]).includes(sessionStorage.getItem('currentUserId'));
  }
}
