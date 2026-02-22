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

  // ✅ FIXED TYPE
  private postsUpdated = new Subject<{
    posts: Post[],
    maxPosts: number
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ FIXED PAGINATION
  getPosts(postsPerPage: number, currentPage: number) {

    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;

    this.http
      .get<{ message: string, posts: any[], maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post: any) => {
              return {
                id: post._id,
                postTitle: post.postTitle,
                postContent: post.postContent,
                imagePath: post.imagePath
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe((transformedData) => {

        this.posts = transformedData.posts;

        this.postsUpdated.next({
          posts: [...this.posts],
          maxPosts: transformedData.maxPosts
        });

      });
  }

  getPostUpdateLister() {
    return this.postsUpdated.asObservable();
  }

  deletePost(id: string):any {
    this.http.delete('http://localhost:3000/api/posts/' + id)
      .subscribe((res) => {
        // const updatedPosts = this.posts.filter(post => post.id !== id);
        // this.posts = updatedPosts;

        // this.postsUpdated.next({
        //   posts: [...this.posts],
        //   maxPosts: this.posts.length
        // });
        if (res) {
          this.router.navigate(['/']);
        }
      });
  }

  addPost(id: string, title: string, content: string, image: File) {

    const postData = new FormData();
    postData.append("postTitle", title);
    postData.append("postContent", content);
    postData.append("image", image, title);

    this.http.post<any>('http://localhost:3000/api/posts', postData)
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/']);
        }
      });
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string,
      postTitle: string,
      postContent: string,
      imagePath: string
    }>('http://localhost:3000/api/posts/' + id);
  }

  editPost(id: string, title: string, content: string, image: any) {

    let postData;

    if (typeof (image) === 'object') {
      postData = new FormData();
      postData.append("id", id);
      postData.append("postTitle", title);
      postData.append("postContent", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        postTitle: title,
        postContent: content,
        image: image
      };
    }

    this.http.put<any>('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}