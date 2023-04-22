import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  @Input() posts: Post[]=[
    //   {title: 'First Post', content: 'This is the post content'},
    // {title: 'Second Post', content: 'This is the post content'},
    // {title: 'Third Post', content: 'This is the post content'}
  ];
  private postsSub: Subscription = new Subscription;

  constructor(private postService: PostService){

  }

  ngOnInit(){
    this.posts = this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
