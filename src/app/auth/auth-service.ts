import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../model/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';

  const BackendUrl = environment.apiUrl + "/user";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token! : string | null;
  private authStatusListener = new Subject<boolean>();
  isAuthenticated = false;
  private tokenTimer:any;
  private userId!: any;

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

  getUserId(){
    return this.userId;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };

    this.http.post(BackendUrl+"/signup", authData)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(["/"]);
        },
        error: (error) => {
          console.log(error);
          this.authStatusListener.next(false);
        }
      });
  }

  login(email: string, password: string) {

    const authData: AuthData = { email, password };

    this.http.post<{token:string, expiresIn: number, userId:string}>(
      BackendUrl+"/login",
      authData
    )
    .subscribe(response => {

      const token = response.token;

      if(token){
        this.token = token;
        this.userId = response.userId;
        const expiresInDuration = response.expiresIn;
        console.log(expiresInDuration);
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate, this.userId);
        this.router.navigate(['/']);
      }
    });
  }

  autoAuthUser(){
    const authInformation:any = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn:any = authInformation!=undefined && authInformation?.expirationDate.getTime() - now.getTime();

    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn/1000)
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;

    this.clearAuthData();
    // localStorage.removeItem('token');   // ✅ remove token
    // localStorage.removeItem('expirationDate'); 

    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  private saveAuthData(token:string, expirationDate: Date, userId:string){
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
     localStorage.removeItem('userId');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId');

    if(!token || !expirationDate || !userId){
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  private setAuthTimer(duration: number){
    console.log('setting timer', duration);
    this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration*1000);
  }
  
}
