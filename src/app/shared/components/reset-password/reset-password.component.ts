import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { TokenValidatorService } from '../../services/token-validator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../UsersServices/users.service';
import { Token } from '../models/token';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {

  minPw = 6;
  formGroup: FormGroup;
  tokenResponse: string;
  tokenId: any;
  token : Token = new Token();
  resetPwUser : { password : ""};
  showModal : boolean;
  resetButtonDisabled: boolean = true;

  constructor(private formBuilder: FormBuilder, private tokenService: TokenValidatorService, 
    private actRoute: ActivatedRoute, private userService: UsersService,private registerService: RegisterService, 
    private router: Router) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(this.minPw)]],
      password2: ['', [Validators.required]]
    }, { validator: passwordMatchValidator });
    this.actRoute.params.subscribe(params => this.tokenId = params['tokenId']);

    this.tokenService.validateToken(this.tokenId).subscribe(data => {
      this.tokenResponse = data;
    });

    this.registerService.validateAdminToken(this.tokenId).subscribe(data => {
      this.tokenResponse = data;
    });      
    
  }

  /* Shorthands for form controls (used from within template) */
  get password() { return this.formGroup.get('password'); }
  get password2() { return this.formGroup.get('password2'); }

  /* Called on each input in either password field */
/*   onPasswordInput() {
    if (this.formGroup.hasError('passwordMismatch'))
      this.password2.setErrors([{ 'passwordMismatch': true }]);
    else
      this.password2.setErrors(null);
  } */
  onPasswordInput() {
    if (this.formGroup.hasError("passwordMismatch")) {
      this.password2.setErrors([
        {
          passwordMismatch: true
        }
      ]);
    } else
      this.password2.setErrors(null);

    if (this.formGroup.valid)
      this.resetButtonDisabled = false;
    else
      this.resetButtonDisabled = true;
  }

  resetPassword(){
    this.formGroup.value.tokenId=this.tokenId;
    this.registerService.resetUserPassword((this.formGroup.value)).subscribe(data => {
   });
    this.showModal = true;
  }

  hide()
  {
    this.showModal = false;
    this.router.navigateByUrl("");
  }
}


export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('password2').value)
    return null;
  else
    return { passwordMismatch: true };
};