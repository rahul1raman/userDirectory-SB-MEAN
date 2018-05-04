import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
    ReactiveFormsModule,
    FormsModule,
  } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {environment} from '../environments/environment';
import { DetailsService } from './shared/services/details.service';
import { DirectoryComponent } from './directory/directory.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MDBBootstrapModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot()
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    declarations: [AppComponent, DirectoryComponent, HeaderComponent],
    providers: [DetailsService],
    bootstrap: [AppComponent]
})
export class AppModule {}
