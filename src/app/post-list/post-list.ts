import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../model/post.model';
import { PostsService } from '../services/posts-service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule, CommonModule, MatButtonModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList implements OnInit, OnDestroy{
  // @Input() 
  // posts: Post[] = [
  //   // {
  //   //   title: 'First Post', 
  //   //   content: 'This is the first post\'s content'
  //   // },
  //   //  {
  //   //   title: 'Second Post', 
  //   //   content: 'This is the second post\'s content'
  //   // },
  //   //  {
  //   //   title: 'Third Post', 
  //   //   content: 'This is the third post\'s content'
  //   // }
  // ]
  posts: Post[]=[];
  private postsSub!: Subscription;
  postResponseAvailable = false;

    constructor(
      private postsService: PostsService, 
      private cd: ChangeDetectorRef){}

    ngOnInit(): void {
      this.postsSub = this.postsService
        .getPostUpdateLister()
        .subscribe((res: Post[]) => {
          
          console.log("Incoming posts:", res);
          console.log("First post:", res[0]);
          this.posts = res;
          this.cd.detectChanges(); 
        });

      this.postsService.getPosts();
    } 

    ngOnDestroy(): void {
      this.postsSub.unsubscribe();
    }
  
}

