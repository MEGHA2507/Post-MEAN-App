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

  pageLength = 5;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 5, 10, 25, 50, 75, 100];

    constructor(
      private postsService: PostsService, 
      private cd: ChangeDetectorRef){}

    ngOnInit(): void {
      //this.isLoading = true;
      this.postsService.getPosts(this.postPerPage ,this.currentPage);
      this.postsSub = this.postsService
        .getPostUpdateLister()
        .subscribe((res) => {
          //this.isLoading = false;
          console.log(res);
          this.posts = res?.posts;
          this.pageLength = res?.maxPosts;
          this.cd.detectChanges();
        });
    } 

    onDelete(id:string){
      this.postsService.deletePost(id);
      this.ngOnInit();
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
    }
  
}

