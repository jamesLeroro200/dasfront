import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { SurveyViewerComponent } from './modules/norms/survey/survey-viewer/survey-viewer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/components/interceptors/token.interceptors';
//import { HttpErrorInterceptor } from './shared/components/interceptors/HttpErrorInterceptor';
import { MatDialogRef, MAT_DIALOG_DATA, MatCardModule } from '@angular/material';
import { AuthService } from './shared/services/auth.service';
import { NguiInviewModule, NguiListModule, NguiUtilsModule }  from '@ngui/common';
import { SideBarService } from './shared/services/side-bar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BarchartAppComponent } from './barchart-app/barchart-app.component';



@NgModule({
  declarations: [
    AppComponent,
    SurveyViewerComponent,
    BarchartAppComponent,  
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatCardModule,
    NguiListModule, 
    NguiInviewModule, 
    NguiUtilsModule,
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },/*
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },*/
    {
      provide: MatDialogRef,
       useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: []
    },
    AuthService,
    NgxSpinnerService,
    SideBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
