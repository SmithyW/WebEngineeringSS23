import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFound404Component } from './not-found404/not-found404.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},

  // 404 Not Found
  {path: '**', component: NotFound404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
