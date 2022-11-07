import {  FormGroup} from '@angular/forms';
import { ValidationMessages } from "./validation-messages";

export class Validation {

    validationMsg = new ValidationMessages();
  
  
    buildValidationErrors(group: FormGroup){
      Object.keys(group.controls).forEach((key) => {
        const abstractControl = group.get(key);
        if(abstractControl instanceof FormGroup){
          this.buildValidationErrors(abstractControl);
        }else{
          this.validationMsg.formErrors[key] = '';
          if(abstractControl && abstractControl.invalid && (abstractControl.touched || abstractControl.dirty)) {
            const messages = this.validationMsg.validationMessage[key];
            for(const errorKey in abstractControl.errors){
              if(errorKey) {
                this.validationMsg.formErrors[key] += messages[errorKey] +' '
              }
            }
          }
  
        }
      })
    }

    buildValidationOnSubmitErrors(group: FormGroup){
      Object.keys(group.controls).forEach((key) => {
        const abstractControl = group.get(key);
        if(abstractControl instanceof FormGroup){
          this.buildValidationErrors(abstractControl);
        }else{
          this.validationMsg.formErrors[key] = '';
          if(abstractControl && abstractControl.invalid ) {
            const messages = this.validationMsg.validationMessage[key];
            for(const errorKey in abstractControl.errors){
              if(errorKey) {
                this.validationMsg.formErrors[key] += messages[errorKey] +' '
              }
            }
          }
  
        }
      })
    }
  
  }
