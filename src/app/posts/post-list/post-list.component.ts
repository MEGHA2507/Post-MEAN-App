import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  @Input() posts: Post[]=[
    //   {title: 'First Post', content: 'This is the post content'},
    // {title: 'Second Post', content: 'This is the post content'},
    // {title: 'Third Post', content: 'This is the post content'}
  ];
}
