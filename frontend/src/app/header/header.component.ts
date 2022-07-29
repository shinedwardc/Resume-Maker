import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public loggedIn = false;
  constructor(public user: UserService) {}
  ngOnInit(): void {
    this.user.loggedInState().subscribe((user) => {
      this.loggedIn = user !== null;
    });
  }
}
