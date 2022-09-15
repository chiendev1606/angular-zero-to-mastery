import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInfo = {
    email: '',
    password: ''
  }

  showAlert = false;
  alertMsg  = '';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  async login(){
      this.showAlert = true;
    this.inSubmission = true;
    this.alertMsg = 'Please wait ! we are logging your account'
    try {
      const res = await this.auth.login(this.loginInfo.email, this.loginInfo.password);
       this.showAlert = false;
       this.inSubmission = false;
    } catch (e){
      console.log(e)
      this.alertColor = 'red';
      this.alertMsg = 'Error occur ! please try again !'
      this.inSubmission = false;
      return;
    }

  }

}
