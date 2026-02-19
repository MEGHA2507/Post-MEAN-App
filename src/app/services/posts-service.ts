import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router){}

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
        this.router.navigate(['/']);
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
        this.router.navigate(['/']);
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

  getPost(id:string){
    //return {...this.posts.find((post) => post.id === id)};
    return this.http.get('http://localhost:3000/api/posts/'+id);
  }

   editPost(id: string, title: string, content: string){
    const post: Post = {id: id, postTitle: title, postContent: content};
     console.log(post);

    this.http.put<any>('http://localhost:3000/api/posts/'+id, post)
    .subscribe((res) => {
      if(res){
        console.log(res);
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((e) => e.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      }
    }) 
  }
}
