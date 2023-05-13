import { Injectable } from '@angular/core';
import { Maybe } from '@shared/custom/types';
import { User } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private user: Maybe<User> = {
    _id: 'hardCodedUserId',
    name: 'Hard Coded User',
    email: "hard@coded.user"
  };

  constructor() {}

  public isLoggedIn(): boolean {
    return true;
  }

  public getUser(): Maybe<User> {
    return this.user;
  }
}
