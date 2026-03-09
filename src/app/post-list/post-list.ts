import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../model/post.model';
import { PostsService } from '../services/posts-service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule, MatProgressSpinnerModule, RouterLink ,CommonModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList implements OnInit, OnDestroy{
  posts: Post[]=[];
  private postsSub!: Subscription;
  postResponseAvailable = false;
  isLoading = false;
  userId!:string;

  pageLength = 5;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 5, 10, 25, 50, 75, 100];

  private authStatusSub!: Subscription;
  userIsAuthenticated!: boolean;

    constructor(
      private postsService: PostsService, 
      private authService: AuthService,
      private cd: ChangeDetectorRef){}

    ngOnInit(): void {
      //this.isLoading = true;
      this.postsService.getPosts(this.postPerPage ,this.currentPage);
      this.userId = this.authService.getUserId();
      this.postsSub = this.postsService
        .getPostUpdateLister()
        .subscribe((res) => {
          //this.isLoading = false;
          console.log(res);
          this.posts = res?.posts;
          this.pageLength = res?.maxPosts;
          this.cd.detectChanges();
        });

        this.userIsAuthenticated = this.authService.getIsAuth();

        this.authStatusSub = this.authService.getAuthStatusListener().subscribe((res) => {
          if(res){
          this.userIsAuthenticated = res;
          this.userId = this.authService.getUserId();
          }
        });
    } 

    onDelete(id:string){
      this.postsService.deletePost(id);
    }

    onChangedPage(event:PageEvent){
      console.log(event);
      //this.isLoading = true;
      this.currentPage =  event.pageIndex +1;
      this.postPerPage = event.pageSize;
      this.postsService.getPosts(this.postPerPage, this.currentPage);
    }

    ngOnDestroy(): void {
      this.postsSub.unsubscribe();
      this.authStatusSub.unsubscribe();
    }
  
}

