import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts(){
    return [...this.posts];
  }

  addPost(title: string, content: string){
    const post: Post = {postTitle: title, postContent: content};
    console.log(post);
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

  getPostUpdateLister(){
    return this.postsUpdated.asObservable();
  }
}
