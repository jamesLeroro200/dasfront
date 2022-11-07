import { Component, OnInit } from "@angular/core";
import { FormBuilder, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Validation } from "../../models/validation";
import { UsersService } from "../UsersServices/users.service";

@Component({
  selector: "app-check-email",
  templateUrl: "./check-email.component.html",
  styleUrls: ["./check-email.component.scss"],
})
export class CheckEmailComponent implements OnInit {
  success = false;

  form: any = {
    email: null,
  };
  errorMessage = "";
  constructor(
    private userService: UsersService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}
  checkForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
  });

  validation = new Validation();
  handleBlurValidation() {
    this.validation.buildValidationErrors(this.checkForm);
  }
  onSubmit() {
    const email = this.form;
    this.userService
      .forgotPassword(email)
      .subscribe(() => (this.success = true));
    this.router.navigate(["confirm-email"]);
  }
}
