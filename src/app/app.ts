import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreate } from "./post-create/post-create";
import { Header } from "./header/header";
import { Post, PostList } from "./post-list/post-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostCreate, Header, PostList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mean-ui-code');

  storedPosts: Post[] = [];

  onPostAdded(post: Post){
    this.storedPosts.push(post);
  }
}
