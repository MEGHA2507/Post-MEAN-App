import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map((post:any) => {
        return {
          postTitle: post.postTitle,
          postContent: post.postContent,
          id: post._id
        }
      });
    }))
    .subscribe((res) => {
      if(res){
        console.log(res);
        this.posts = res;
        this.postsUpdated.next([...this.posts]);
      }
    });
  }

  addPost(id: string, title: string, content: string){
    const post: Post = {id: id, postTitle: title, postContent: content};
     console.log(post);

    this.http.post<any>('http://localhost:3000/api/posts', post)
    .subscribe((res) => {
      if(res){
        console.log(res);
        const id= res.id;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      }
    }) 
  }

  getPostUpdateLister(){
    return this.postsUpdated.asObservable();
  }

  deletePost(id:string){
    this.http.delete('http://localhost:3000/api/posts/'+id)
    .subscribe((res) => {
      console.log(res);
      const updatedPosts =this.posts.filter((post)=> post.id !== id);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }
}
