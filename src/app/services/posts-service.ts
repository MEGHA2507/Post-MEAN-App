import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').
    subscribe((res) => {
      if(res){
        console.log(res);
         const transformedPosts = res.posts.map(post => {
            return {
              id: post.id,
              postTitle: post.postTitle,
              postContent: post.postContent
            };
          });

      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);

      }
    });
  }

  addPost(id: string, title: string, content: string){
    const post: Post = {id: id, postTitle: title, postContent: content};
     console.log(post);

    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((res) => {
      if(res){
        console.log(res);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      }
    }) 
  }

  getPostUpdateLister(){
    return this.postsUpdated.asObservable();
  }
}
