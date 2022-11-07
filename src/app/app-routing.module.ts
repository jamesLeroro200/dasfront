import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { DefaultComponent } from "./layouts/default/default.component";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { PostsComponent } from "./modules/posts/posts.component";
import { NormsComponent } from "./modules/norms/norms.component";
import { NormChapterComponent } from "./modules/norms/norm-chapter/norm-chapter.component";
import { NormArticlesComponent } from "./modules/norms/norm-articles/norm-articles.component";
import { SurveyJsComponent } from "./modules/norms/survey/survey-js/survey-js.component";
import { CompaniesComponent } from "./modules/companies/companies.component";
import { CompanyFormComponent } from "./shared/components/company-form/company-form.component";
import { EditCompanyComponent } from "./shared/components/edit-company/edit-company.component";
import { ResetPasswordComponent } from "./shared/components/reset-password/reset-password.component";
import { ApplicationReviewerComponent } from "./shared/components/reviewer/application-reviewer/application-reviewer.component";
import { ReportReviewerComponent } from "./shared/components/reviewer/report-reviewer/report-reviewer.component";
import { ApplicationReviewerSurveyJsComponent } from "./shared/components/reviewer/application-reviewer-survey-js/application-reviewer-survey-js.component";
import { RegisterComponent } from "./shared/components/register/register.component";
import { AuthGuard } from "./shared/components/guard/auth.guard";
import { LoginComponent } from "./shared/components/login/login.component";
import { ReportReviewerSurveyJsComponent } from "./shared/components/reviewer/report-reviewer-survey-js/report-reviewer-survey-js.component";
import { SideBarService } from "./shared/services/side-bar.service";
import { throwError } from "rxjs";
import { CheckEmailComponent } from "./shared/components/check-email/check-email.component";
import { ConfirmResetForgotPasswordComponent } from "./shared/components/confirm-reset-forgot-password/confirm-reset-forgot-password.component";
import { ResetForgotPasswordComponent } from "./shared/components/reset-forgot-password/reset-forgot-password.component";
import { AdminComponent } from "./shared/components/user-management/admin/admin.component";
import { SuperUserComponent } from "./shared/components/user-management/super-user/super-user.component";
import { UserComponent } from "./shared/components/user-management/user/user.component";
import { ReviewerComponent } from "./shared/components/user-management/reviewer/reviewer.component";

//import all component

const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "register",
        component: RegisterComponent,
      },
      //****  RESET FORGOT PASSWORD ****/
      { path: "check-email", component: CheckEmailComponent },
      { path: "confirm-email", component: ConfirmResetForgotPasswordComponent },
      { path: "resetPassword", component: ResetForgotPasswordComponent },
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      },

      { path: "tables", component: PostsComponent },
      { path: "Norms", component: NormsComponent },
      { path: "Norms/Normchapter/:id", component: NormChapterComponent },
      { path: "Norms/NormArticles/:id", component: NormArticlesComponent },
      { path: "Norms/SurveyJs/:id", component: SurveyJsComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "tables", component: PostsComponent },
      { path: "companyTable", component: CompaniesComponent },
      { path: "companyTable/newCompany", component: CompanyFormComponent },
      { path: "companyTable/editCompany/:id", component: EditCompanyComponent },
      {
        path: "resetAdminPassword/:tokenId",
        component: ResetPasswordComponent,
      },
      { path: "applicationReviewer", component: ApplicationReviewerComponent },
      {
        path: "application/SurveyJsReviewer/:id",
        component: ApplicationReviewerSurveyJsComponent,
      },
      { path: "reportReviewer", component: ReportReviewerComponent },
      {
        path: "report/SurveyJsReviewer/:id",
        component: ReportReviewerSurveyJsComponent,
      },
      { path: "admin-table", component: AdminComponent },
      { path: "super-user-table", component: SuperUserComponent },
      { path: "user-table", component: UserComponent },
      { path: "reviewer-table", component: ReviewerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router, private sideBarService: SideBarService) {
    this.router.errorHandler = (error: any) => {
      console.log(error);
      localStorage.setItem("token", null);
      this.sideBarService.showLogin = true;
      this.sideBarService.showLogout = false;
      this.sideBarService.showSideBar = false;
      this.router.navigate([""]);
      throwError(
        "ErrorStatus: " + error.status + " and ErrorMessage: " + error.message
      );
    };
  }
}
