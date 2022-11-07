import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { MDBBootstrapModule, ModalModule } from "angular-bootstrap-md";
import {
  MatDividerModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatSelectModule,
  MatAutocompleteModule,
} from "@angular/material";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { AreaComponent } from "./widgets/area/area.component";
import { HighchartsChartModule } from "highcharts-angular";
import { CardComponent } from "./widgets/card/card.component";
import { PieComponent } from "./widgets/pie/pie.component";
import { TasKTableComponent } from "./widgets/tas-ktable/tas-ktable.component";
import { SuperUsersListComponent } from "./components/super-users-list/super-users-list.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { SuperUsersService } from "./components/UsersServices/super-users.service";
import { UsersService } from "./components/UsersServices/users.service";
import { ReviewersService } from "./components/UsersServices/reviewers.service";
import { ReviewersListComponent } from "./components/reviewers-list/reviewers-list.component";
import { MatTableModule } from "@angular/material/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UpdateCreatDialogComponent } from "./components/dialog/update-creat-dialog/update-creat-dialog.component";
import { MyTelInputComponent } from "./components/dialog/my-tel-input/my-tel-input.component";
import { NgxMatIntlTelInputModule } from "ngx-mat-intl-tel-input";
import { DeleteConfirmationComponent } from "./components/dialog/delete-confirmation/delete-confirmation.component";
import { HttpClientModule } from "@angular/common/http";
import { CompanyListComponent } from "./components/company-list/company-list.component";
import { CompanyFormComponent } from "./components/company-form/company-form.component";
import { EditCompanyComponent } from "./components/edit-company/edit-company.component";
import { TokenValidatorService } from "./services/token-validator.service";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { ConfirmationSuperUserComponent } from "./dialog/confirmation-super-user/confirmation-super-user.component";
import { CreatDialogUserComponent } from "./dialog/creat-dialog-user/creat-dialog-user.component";
import { ApplicationReviewerComponent } from "./components/reviewer/application-reviewer/application-reviewer.component";
import { ReportReviewerComponent } from "./components/reviewer/report-reviewer/report-reviewer.component";
import { ApplicationReviewerDialogComponent } from "./components/dialog/application-reviewer-dialog/application-reviewer-dialog.component";
import { ApplicationReviewerSurveyJsComponent } from "./components/reviewer/application-reviewer-survey-js/application-reviewer-survey-js.component";
import { SurveyCreatorComponent } from "./components/reviewer/survey-creator/survey-creator.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthService } from "./services/auth.service";
import { SideBarService } from "./services/side-bar.service";
import { AdminUsersListComponent } from "./components/admin-users-list/admin-users-list.component";
import { AdminUsersService } from "./components/UsersServices/admin-users.service";
import {
  NguiInviewModule,
  NguiListModule,
  NguiUtilsModule,
} from "@ngui/common";

import { SameMailComponent } from "./components/dialog/same-mail/same-mail.component";
import { UploadImageComponent } from "./components/upload-image/upload-image.component";
import { SafePipe } from "../safe.pipe";
import { ReportReviewerSurveyJsComponent } from "./components/reviewer/report-reviewer-survey-js/report-reviewer-survey-js.component";
import { ReportReviewerDialogComponent } from "./components/dialog/report-reviewer-dialog/report-reviewer-dialog.component";
import { ReportReviewerService } from "./components/services/report-reviewer.service";
import { UpdateCreatReviewerComponent } from "./components/dialog/update-creat-reviewer/update-creat-reviewer.component";
import { UpdateReviewerComponent } from "./components/dialog/update-reviewer/update-reviewer.component";
import { UpdateUserComponent } from "./components/dialog/update-user/update-user.component";
import { UpdateSuperUserAndAdminComponent } from "./components/dialog/update-super-user-and-admin/update-super-user-and-admin.component";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { MomentModule } from "angular2-moment";
import { NgIdleModule } from "@ng-idle/core";
import { CheckEmailComponent } from "./components/check-email/check-email.component";
import { ResetForgotPasswordComponent } from "./components/reset-forgot-password/reset-forgot-password.component";
import { ConfirmResetForgotPasswordComponent } from "./components/confirm-reset-forgot-password/confirm-reset-forgot-password.component";
import { AdminComponent } from './components/user-management/admin/admin.component';
import { ReviewerComponent } from './components/user-management/reviewer/reviewer.component';
import { SuperUserComponent } from './components/user-management/super-user/super-user.component';
import { UserComponent } from './components/user-management/user/user.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SafePipe,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    TasKTableComponent,
    SuperUsersListComponent,
    AdminUsersListComponent,
    UsersListComponent,
    ReviewersListComponent,
    UpdateCreatDialogComponent,
    MyTelInputComponent,
    DeleteConfirmationComponent,
    CompanyListComponent,
    CompanyFormComponent,
    EditCompanyComponent,
    ResetPasswordComponent,
    ConfirmationSuperUserComponent,
    CreatDialogUserComponent,
    ApplicationReviewerComponent,
    SurveyCreatorComponent,
    ApplicationReviewerDialogComponent,
    ApplicationReviewerSurveyJsComponent,
    ReportReviewerComponent,
    RegisterComponent,
    LoginComponent,
    AdminUsersListComponent,
    SameMailComponent,
    UploadImageComponent,
    ReportReviewerSurveyJsComponent,
    ReportReviewerDialogComponent,
    UpdateCreatReviewerComponent,
    UpdateReviewerComponent,
    UpdateUserComponent,
    UpdateSuperUserAndAdminComponent,
    CheckEmailComponent,
    ResetForgotPasswordComponent,
    ConfirmResetForgotPasswordComponent,
    AdminComponent,
    ReviewerComponent,
    SuperUserComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MDBBootstrapModule.forRoot(),
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputModule,
    MatStepperModule,
    MatDatepickerModule,
    HttpClientModule,
    MatNativeDateModule,
    MatCardModule,
    NgxSpinnerModule,
    NguiListModule,
    NguiInviewModule,
    NguiUtilsModule,
    ModalModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    NgIdleModule,
  ],
  exports: [
    HeaderComponent,
    SafePipe,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    MatAutocompleteModule,
    TasKTableComponent,
    SuperUsersListComponent,
    AdminUsersListComponent,
    UsersListComponent,
    ReviewersListComponent,
    UpdateCreatDialogComponent,
    MyTelInputComponent,
    DeleteConfirmationComponent,
    CompanyListComponent,
    CompanyFormComponent,
    EditCompanyComponent,
    NgxSpinnerModule,
    ConfirmationSuperUserComponent,
    CreatDialogUserComponent,
    ApplicationReviewerDialogComponent,
    ReportReviewerDialogComponent,
    NguiListModule,
    NguiInviewModule,
    NguiUtilsModule,
    UpdateCreatReviewerComponent,
    UpdateReviewerComponent,
    UpdateUserComponent,
    UpdateSuperUserAndAdminComponent,
  ],
  entryComponents: [
    UpdateCreatDialogComponent,
    UpdateSuperUserAndAdminComponent,
    CreatDialogUserComponent,
    UpdateUserComponent,
    ApplicationReviewerDialogComponent,
    ReportReviewerDialogComponent,
    UpdateCreatReviewerComponent,
    DeleteConfirmationComponent,
    ConfirmationSuperUserComponent,
    LoginComponent,
    UpdateReviewerComponent,
    HeaderComponent,
    UploadImageComponent,
    SameMailComponent,
  ],

  providers: [
    SuperUsersService,
    UsersService,
    AdminUsersService,
    AdminUsersService,
    ReviewersService,
    TokenValidatorService,
    AuthService,
    SideBarService,
    ReportReviewerService,
  ],
})
export class SharedModule {}
