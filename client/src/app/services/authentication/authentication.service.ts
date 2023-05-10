import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor() {}

  public isLoggedIn(): boolean {
    return true;
  }
}
