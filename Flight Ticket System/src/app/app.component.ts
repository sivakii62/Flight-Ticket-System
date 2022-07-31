import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flight-ticket-system';

  ngOnInit() {
    sessionStorage.setItem("id", JSON.stringify(['1', '2']));
    sessionStorage.setItem("pass", JSON.stringify(['1', '2']));
    sessionStorage.setItem("roles", JSON.stringify(['employee', 'employee']));
  }

  checkUserIsLoggedIn(): boolean {
    return (JSON.parse(sessionStorage.getItem('id')) as any[]).includes(sessionStorage.getItem('currentUserId'));
  }
}
