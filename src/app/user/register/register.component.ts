import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name = new FormControl('', [Validators.required, Validators.minLength(4)])
  email = new FormControl('', [Validators.required, Validators.email])
  age= new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)])
  password= new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
  confirmPassword= new FormControl('')
  phoneNumber= new FormControl('', [Validators.minLength(8), Validators.maxLength(13)])

  showMsg = false;
  alertMsg ='';


  registerForm = new FormGroup({
     name: this.name,
     email: this.email,
      age: this.age,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber,
  })

  constructor() { }

  ngOnInit(): void {
  }

  register(){
    console.log('ok')
    this.showMsg = true;
    this.alertMsg = 'please wait ! your account is being proccess '

  }

}
