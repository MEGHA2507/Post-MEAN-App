import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  constructor() { }

  getPosts(){
    return [...this.posts];
  }

  addPost(post:Post){
    this.posts.push(post);
  }
}
