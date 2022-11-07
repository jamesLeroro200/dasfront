import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Validation } from "../../models/validation";
import { Token } from "../models/token";
import { UsersService } from "../UsersServices/users.service";

@Component({
  selector: "app-reset-forgot-password",
  templateUrl: "./reset-forgot-password.component.html",
  styleUrls: ["./reset-forgot-password.component.scss"],
})
export class ResetForgotPasswordComponent implements OnInit {
  resetKey: string = "";
  newPasswordForm: FormGroup;
  error = "";
  resetButtonDisabled: boolean = true;
  validation = new Validation();
  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.newPasswordForm = this.formBuilder.group(
      {
        newPassword: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
      },
      { validator: passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.newPasswordForm.valueChanges.subscribe((data) => {
      this.validation.buildValidationErrors(this.newPasswordForm);
    });
    this.route.queryParams.subscribe((params) => {
      if (params != undefined) {
        this.resetKey = params["resetKey"];
      }
    });
  }
  IsResetFormValid;
  submitNewPassword() {
    if (this.newPasswordForm.valid) {
      this.IsResetFormValid = true;
      this.userService
        .resetPassword(
          this.newPasswordForm.controls["newPassword"].value,
          this.resetKey
        )
        .subscribe((response) => {
          this.router.navigate(["login"]);
        });
    } else {
      this.IsResetFormValid = false;
    }
  }

  handleBlurValidation() {
    this.validation.buildValidationErrors(this.newPasswordForm);
  }
}

export const passwordMatchValidator: ValidatorFn = (
  formGroup: FormGroup
): ValidationErrors | null => {
  if (
    formGroup.get("newPassword").value ===
    formGroup.get("confirmPassword").value
  )
    return null;
  else return { passwordMismatch: true };
};
