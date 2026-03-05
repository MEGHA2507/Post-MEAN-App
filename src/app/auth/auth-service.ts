import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../model/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token! : string | null;
  private authStatusListener = new Subject<boolean>();
  isAuthenticated = false;
  private tokenTimer:any;

  constructor(private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  createUser(email:string, password:string){
    const authData: AuthData = {
      email: email,
      password: password
    }

    this.http.post("http://localhost:3000/api/user/signup", authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  login(email: string, password: string) {

    const authData: AuthData = { email, password };

    this.http.post<{token:string, expiresIn: number}>(
      "http://localhost:3000/api/user/login",
      authData
    )
    .subscribe(response => {

      const token = response.token;

      if(token){
        this.token = token;
        const expiresInDuration = response.expiresIn;
        console.log(expiresInDuration);

        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, expiresInDuration*1000);

        this.isAuthenticated = true;

        localStorage.setItem('token', token);  // ✅ store token

        this.authStatusListener.next(true);
        this.router.navigate(['/']);
      }

    });
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;

    localStorage.removeItem('token');   // ✅ remove token

    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }
  
}
