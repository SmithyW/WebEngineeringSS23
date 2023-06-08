import { Injectable } from '@angular/core';
import { Maybe } from '@shared/custom/types';
import { User } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private user: Maybe<User> = {
    _id: 'Ujmq394n0mhwepfu',
    name: 'Test User',
    email: "user@example.test"
  };

  constructor() {}

  public isLoggedIn(): boolean {
    return true;
  }

  public getUser(): Maybe<User> {
    return this.user;
  }
}
