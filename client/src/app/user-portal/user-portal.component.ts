import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.scss']
})
export class UserPortalComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit(): void {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(["login"]);
      } else {
        this.router.navigate(["home"]);
      }
  }
}
