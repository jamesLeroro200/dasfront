import { SideBarService } from "./../../services/side-bar.service";
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { Component, OnInit, Inject } from "@angular/core";
import { Validation } from "../../models/validation";
import { FormBuilder, Validators, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  error = "";
  conf = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sideBarService: SideBarService,
    @Inject(MAT_DIALOG_DATA) public configuration: any,
    private dialog: MatDialog
  ) {}

  validation = new Validation();
  ngOnInit() {
    this.loginForm.valueChanges.subscribe((date) => {
      this.validation.buildValidationErrors(this.loginForm);
    });

    if (localStorage.getItem("token") != null) {
      this.sideBarService.showLogout = true;
      this.sideBarService.showLogin = false;
    } else {
      this.sideBarService.showLogout = false;
      this.sideBarService.showLogin = true;
    }
  }
  loginForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });
  handleBlurValidation() {
    this.validation.buildValidationErrors(this.loginForm);
  }

  onFormSubmit(form: NgForm) {
    this.authService.login(form).subscribe(async (res) => {
      this.authService.setUserLoggedIn(true);
      if (res.token) {
        localStorage.setItem("token", res.token);
        this.sideBarService.toggle();
        this.sideBarService.getRole().subscribe((res) => {
          console.log("Res.Role: " + res.role);
          if (res.role == "ADMIN") {
            this.sideBarService.showSideBar = true;
            this.router.navigate(["tables"]);
          } else {
            this.sideBarService.showSideBar = false;
            this.router.navigate([""]);
          }
        });
        //this.dialogref.close();
      } else {
        if (res.errorcode == "0") {
          this.error = res.errormessage;
        } else {
          this.error = "Username or password is incorrect";
        }
      }
    });
  }

  message;
  openReegistry() {
    const configuration = new MatDialogConfig();
    configuration.autoFocus = true;
    let dialogRef = this.dialog.open(RegisterComponent, configuration);
    dialogRef.afterClosed().subscribe(
      (data) => {
        this.message = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goToForgotPassword() {
    this.router.navigate(["check-email"]);
  }
}
