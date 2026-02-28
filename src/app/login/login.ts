import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/select';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormField, MatError, MatCardModule, CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{
  loginForm!: FormGroup;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: Validators.required})
    })
  }

  loginSubmit(){
    console.log(this.loginForm.value);
    if(this.loginForm.invalid){
      return;
    }

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
    this.loginForm.reset();
  }

}
