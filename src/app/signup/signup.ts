import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatError } from '@angular/material/select';
import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [MatButtonModule, MatFormField, MatError, MatCardModule, CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  signupForm!: FormGroup;
  private authStatusSub!: Subscription;

  constructor(private authService: AuthService, private cd: ChangeDetectorRef,
    private router: Router){}

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
       // this.isLoading = false;
      }
    );

    this.signupForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: Validators.required})
    })
  }

  signupSubmit(){
    console.log(this.signupForm.value);
    if(this.signupForm.invalid){
      return;
    }

    this.authService.createUser(this.signupForm.value.email, this.signupForm.value.password);
    this.router.navigate(['/']);
    this.cd.detectChanges();
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
