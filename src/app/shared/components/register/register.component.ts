import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  Validators,
  NgForm,
  FormGroupDirective,
} from "@angular/forms";
import { Observable } from "rxjs";
import {
  MatDialogRef,
  MatDialogConfig,
  MatDialog,
} from "@angular/material/dialog";
import { SideBarService } from "../../services/side-bar.service";
import { ErrorStateMatcher } from "@angular/material";
import { Router } from "@angular/router";
import { RegisterService } from "../../services/register.service";
import { Validation } from "../../models/validation";
import { startWith, map } from "rxjs/operators";
import { LoginComponent } from "../login/login.component";
import countries from "../../../data/countries.json";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  controlCitie = new FormControl();
  filteredOption2: Observable<String[]>;
  success = "";
  fullName = "";
  email = "";
  password = "";
  error: any;
  filteredOption: Observable<String[]>;
  country: String[] = Object.keys(countries);
  controlCountry = new FormControl();
  controlCity = new FormControl();
  cities = [];
  filteredCitiesOption: Observable<String[]>;
  countryVar: any;

  constructor(
    private dialog: MatDialog,
    public dialogref: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private sideBarService: SideBarService,
    private router: Router,
    private registerService: RegisterService
  ) {}
  validation = new Validation();
  ngOnInit() {
    this.filteredOption = this.controlCountry.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterCountry(value))
    );
    this.registerForm.valueChanges.subscribe((data) => {
      this.validation.buildValidationErrors(this.registerForm);
    });
  }

  registerForm = this.formBuilder.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    country: [""],
    region: ["", [Validators.required]],
    adress: ["", [Validators.required]],
    zip: [
      "",
      [Validators.required, Validators.minLength(4), Validators.maxLength(6)],
    ],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  handleBlurValidation() {
    this.validation.buildValidationErrors(this.registerForm);
  }

  async onSubmit(form: NgForm) {
    await this.registerService
      .register(form)
      .toPromise()
      .then(async (res) => {
        if (res.error != null) {
          console.log("Error in Register Service: " + res.error);
          this.error = res.error;
        } else {
          this.router.navigate(["login"]);
        }
        // await this.sideBarService.toggle();
      });
  }

  onNoClick(): void {
    this.dialogref.close();
  }
  _filterCity(value: String): String[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter((country) =>
      country.toLowerCase().includes(filterValue)
    );
  }

  _filterCountry(value: String): String[] {
    const filterValue = value.toLowerCase();
    return this.country.filter((country) =>
      country.toLowerCase().includes(filterValue)
    );
  }

  _filterCitie(value: String): String[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter((city) =>
      city.toLowerCase().includes(filterValue)
    );
  }
  selectchange(ob) {
    this.countryVar = ob.value;
    console.log(this.countryVar);
    this.registerForm.get("region").reset;
    this.cities = Object.values(countries[this.countryVar]);
    console.log(this.cities);
    this.filteredOption = this.registerForm.get("country").valueChanges.pipe(
      startWith(""),
      map((value) => this._filterCountry(value))
    );
    this.filteredCitiesOption = this.registerForm
      .get("region")
      .valueChanges.pipe(
        startWith(""),
        map((value) => this._filterCity(value))
      );
  }
  refresh() {
    this.registerForm.get("region").reset;
    this.cities = Object.values(countries[this.countryVar]);
    console.log(this.cities);
    this.filteredOption = this.registerForm.get("country").valueChanges.pipe(
      startWith(""),
      map((value) => this._filterCountry(value))
    );
    this.filteredCitiesOption = this.registerForm
      .get("region")
      .valueChanges.pipe(
        startWith(""),
        map((value) => this._filterCity(value))
      );
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
