import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavLink } from './nav-link.enum';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  readonly TIMETRACKING = NavLink.TIMETRACKING;
  readonly CONTRACTS = NavLink.CONTRACTS;
  readonly ACCOUNT = NavLink.ACCOUNT;

  constructor(private router: Router) {}

  navigate(link: NavLink) {
    let url = [];
    switch (link) {
      case this.TIMETRACKING:
        url = ['home', 'zeiterfassung'];
        break;
      case this.CONTRACTS:
        url = ['home', 'vertragdetails'];
        break;
      case this.ACCOUNT:
        url = ['home', 'account'];
        break;
    }
    this.router.navigate(url);
  }

  logout() {
    console.error('Logout not implemented');
  }
}
