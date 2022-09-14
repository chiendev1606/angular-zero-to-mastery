import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {RegisterService} from "../../services/register.service";
import {IUser} from "../../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService) {
  }


  name = new FormControl('', [Validators.required, Validators.minLength(4)])
  email = new FormControl('', [Validators.required, Validators.email])
  age = new FormControl<number | null>(null, [Validators.required, Validators.min(18), Validators.max(120)])
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
  confirmPassword = new FormControl('')
  phoneNumber = new FormControl('', [Validators.minLength(8), Validators.maxLength(13)])

  showMsg = false;
  alertMsg = '';
  bgColor = '';
  loading = false;


  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber,
  })


  ngOnInit(): void {
  }

  async register() {
    this.showMsg = true;
    this.alertMsg = 'please wait ! your account is being proccess '


    this.loading = true;

    const hasCreated = await this.registerService.createUser(this.registerForm.value as IUser)

    if(hasCreated){
      this.showMsg = true;
      this.alertMsg = 'your account has been created '
      this.bgColor = 'green';

    } else{
      this.showMsg = true;
      this.alertMsg = 'an unexpected occur. please try again later'
      this.bgColor = 'red';
    }


      this.loading = false;





  }

}
