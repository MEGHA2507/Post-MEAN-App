import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{

  @Input() posts: Post[]=[
    //   {title: 'First Post', content: 'This is the post content'},
    // {title: 'Second Post', content: 'This is the post content'},
    // {title: 'Third Post', content: 'This is the post content'}
  ];

  constructor(private postService: PostService){

  }

  ngOnInit(){
    this.posts = this.postService.getPosts();
  }
}
