import { Component, Input } from '@angular/core';
import {Post} from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course';
  postsList: Post[]=[];

  postAdded(post: Post){
    console.log(post);
    this.postsList.push(post);
  }
}
