import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RoseComponent } from './rose/rose.component';
import { AutomaticComponent } from './rose/automatic/automatic.component';
import { FeedbackComponent } from './rose/feedback/feedback.component';
import { DashboardComponent } from './rose/dashboard/dashboard.component';
import { ManualComponent } from './rose/manual/manual.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RoseComponent,
    AutomaticComponent,
    FeedbackComponent,
    DashboardComponent,
    ManualComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
