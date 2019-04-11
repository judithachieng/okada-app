import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;

import { User } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // currentUser: this.authService.;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // this.authService.currentUser.subscribe( data => this.currentUser = data
    // );
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
