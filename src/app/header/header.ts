import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy{
  userIsAuthenticated!: boolean;
  private authListenerSubs!: Subscription;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((res) => {
      if(res){
        console.log('user auth', res)
      this.userIsAuthenticated = res;
      }
      
    });
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

}
