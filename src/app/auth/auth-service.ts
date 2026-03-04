import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../model/auth-data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token! : string | null;
  private authStatusListener = new Subject<boolean>();
  isAuthenticated = false;

  constructor(private http: HttpClient){}

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

    this.http.post<{token:string}>(
      "http://localhost:3000/api/user/login",
      authData
    )
    .subscribe(response => {

      const token = response.token;

      if(token){
        this.token = token;
        this.isAuthenticated = true;

        localStorage.setItem('token', token);  // ✅ store token

        this.authStatusListener.next(true);
      }

    });
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;

    localStorage.removeItem('token');   // ✅ remove token

    this.authStatusListener.next(false);
  }
  
}
