import { Component } from '@angular/core';
import {Validator} from "./IdValidator.module"
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form : FormGroup
  validator : Validator
  constructor(formbuilder : FormBuilder){
    this.validator = new Validator() // from the validator class idValidator.module.ts
    this.form = formbuilder.group({
      Name : new FormControl("",Validators.required),
      IDno : new FormControl("",[Validators.required,this.validator.validID]),
      OTP : new FormControl("",Validators.required)

    })

    //this.form.controls["nameRequiredSpan"].disable


  }

  nameRequiredError() : boolean{
    var errorJson :boolean = this.form.controls["Name"].getError("required")
    if (errorJson == true) {
      return true
    }

    return false
  }

  idRequiredError() : boolean{
    var errorJson :boolean = this.form.controls["IDno"].getError("required")
    
    if (errorJson == true) {
      return true
    }

    return false
  }

  idValidError() : boolean{
    var errorJson :boolean = this.form.controls["IDno"].getError("validID")
    
    if (errorJson == true) {
      return true
    }

    return false
  }

  otpRequiredError() : boolean{
    var errorJson :boolean = this.form.controls["OTP"].getError("required")
    
    if (errorJson == true) {
      return true
    }

    return false
  }
  onSubmission(){
    console.log()
    if(this.form.controls["Name"].errors == null && this.form.controls["IDno"].errors == null && this.form.controls["OTP"].errors == null){

    }
    else{

    }
  }
}
