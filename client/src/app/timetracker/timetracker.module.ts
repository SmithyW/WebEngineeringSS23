import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetrackerComponent } from './timetracker.component';
import { HomeComponent } from './home/home.component';
import { TimetrackerRoutingModule } from './timetracker-routing.module';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    TimetrackerComponent,
    HomeComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    TimetrackerRoutingModule,
    MatToolbarModule
  ]
})
export class TimetrackerModule { }
