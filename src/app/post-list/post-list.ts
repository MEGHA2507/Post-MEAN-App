import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../model/post.model';
import { PostsService } from '../services/posts-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule, CommonModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList implements OnInit, OnDestroy{
  // @Input() 
  posts: Post[] = [
    // {
    //   title: 'First Post', 
    //   content: 'This is the first post\'s content'
    // },
    //  {
    //   title: 'Second Post', 
    //   content: 'This is the second post\'s content'
    // },
    //  {
    //   title: 'Third Post', 
    //   content: 'This is the third post\'s content'
    // }
  ]
  private postsSub!: Subscription;

    constructor(private postsService: PostsService){  
    }

    ngOnInit(): void {
      //this.posts = this.postsService.getPosts();

      this.postsSub = this.postsService.getPostUpdateLister().subscribe((res: Post[]) => {
        if(res){
          this.posts = res;
          console.log(this.posts);

        }
      })
    } 

    ngOnDestroy(): void {
      this.postsSub.unsubscribe();
    }
  
}

