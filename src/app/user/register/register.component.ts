import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
     name: new FormControl('', [Validators.required, Validators.minLength(4)]),
     email: new FormControl(''),
      age: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      phoneNumber: new FormControl(''),
  })

  constructor() { }

  ngOnInit(): void {
  }

}
