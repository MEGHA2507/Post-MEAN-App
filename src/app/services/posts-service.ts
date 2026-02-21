import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class PostsService {
  private posts: any = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router){}

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map((post:any) => {
        return {
          postTitle: post.postTitle,
          postContent: post.postContent,
          id: post._id,
          imagePath: post.imagePath
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

  addPost(id: string, title: string, content: string, image: File){

     const postData = new FormData();
     postData.append("postTitle", title);
     postData.append("postContent", content);
     postData.append("image", image, title);

    this.http.post<any>('http://localhost:3000/api/posts', postData)
    .subscribe((res) => {
      if(res){
        const post = {
          id: res.id,
          postTitle: title,
          postContent: content,
          imagePath: image
        }
        this.posts.push(postData);
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
      const updatedPosts =this.posts.filter((post:any)=> post.id !== id);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }

  getPost(id:string){
    return this.http.get<{_id:string, title: string, content:string, imagePath: string}>('http://localhost:3000/api/posts/'+id);
  }

   editPost(id: string, title: string, content: string, image: any){
    let postData;
    if(typeof(image) === 'object'){
       postData = new FormData();
       postData.append("id", id);
        postData.append("postTitle", title);
        postData.append("postContent", content);
        postData.append("image", image, title);
    }else{
      postData = {
        id: id, 
        postTitle: title, 
        postContent: content, 
        image: image
      };

    }

    this.http.put<any>('http://localhost:3000/api/posts/'+id, postData)
    .subscribe((res) => {
      if(res){
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((e) => e.id === id);
        const post : Post = {
          id: id, 
          postTitle: title, 
          postContent: content, 
          imagePath: image
        }
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      }
    }) 
  }
}
