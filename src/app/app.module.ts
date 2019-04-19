import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module/material.module';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { RidersComponent } from './components/riders/riders.component';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Constants } from './constants';
import { RidersService} from './_services/riders/riders.service';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { RiderDetailsComponent } from './components/rider-details/rider-details.component';
import { RidersFormComponent } from './components/riders-form/riders-form.component';
import { RidersModalService } from './components/shared/riders-modal.service';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { MotoComponent } from './components/moto/moto.component';
import { EditModalService } from './components/shared/edit-modal.service';
import { MotoService } from './_services/moto/moto.service';
import { MotoFormComponent } from './components/moto-form/moto-form.component';
import { MotoModalService } from './components/shared/moto-modal.service';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersModalService } from './components/shared/users-modal.service';
import { DriveComponent } from './components/drive/drive.component';
import { ClientComponent } from './components/client/client.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    RidersComponent,
    UsersComponent,
    RiderDetailsComponent,
    RidersFormComponent,
    EditFormComponent,
    MotoComponent,
    MotoFormComponent,
    UsersFormComponent,
    DriveComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    RidersFormComponent,
    EditFormComponent,
    MotoFormComponent,
    UsersFormComponent,
  ],
  providers: [
    Constants,
    RidersService,
    RidersModalService,
    EditModalService,
    MotoService,
    MotoModalService,
    UsersModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
