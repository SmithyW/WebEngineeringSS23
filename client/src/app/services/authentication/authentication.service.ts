import { Injectable } from '@angular/core';
import { Maybe } from '@shared/custom/types';
import { User } from '@shared/models/user.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private user: Maybe<User> = {
    _id: environment.DEFAULT_USER._id,
    name: environment.DEFAULT_USER.name,
    email: environment.DEFAULT_USER.email
  };

  constructor() {}

  public isLoggedIn(): boolean {
    return true;
  }

  public getUser(): Maybe<User> {
    return this.user;
  }
}
