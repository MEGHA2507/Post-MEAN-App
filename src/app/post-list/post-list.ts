import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule, CommonModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList {
  posts: Post[] = [
    {
      title: 'First Post', 
      content: 'This is the first post\'s content'
    },
     {
      title: 'Second Post', 
      content: 'This is the second post\'s content'
    },
     {
      title: 'Third Post', 
      content: 'This is the third post\'s content'
    }
  ]
}

export interface Post{
  title: string,
  content: string
}
