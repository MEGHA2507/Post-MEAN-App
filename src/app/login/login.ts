import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormField } from '@angular/material/select';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormField, MatError, MatCardModule, CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', {validators: Validators.required}),
      password: new FormControl('', {validators: Validators.required})
    })
  }

  loginSubmit(){
    console.log(this.loginForm.value);
  }

}
