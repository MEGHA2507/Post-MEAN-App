import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { Post } from '../model/post.model';
import { CommonModule } from '@angular/common';
import { PostsService } from '../services/posts-service';

@Component({
  selector: 'app-post-create',
  imports: [CommonModule,FormsModule, MatInputModule, MatButtonModule, MatCard],
  templateUrl: './post-create.html',
  styleUrls: ['./post-create.scss'],
})
export class PostCreate {

  enteredContent = '';
  enteredTitle = '';
  // @Output() postCreated = new EventEmitter<Post>();

  constructor(private postsService: PostsService){}

  onSavePost(form: NgForm) {
    if(form.invalid){
      return;
    }
    //console.log(form.value)
  //  const post: Post = {
  //   title: form.value.postTitle,
  //   content: form.value.postContent
  //  }
  //  this.postCreated.emit(post);
   this.postsService.addPost('',form.value.postTitle, form.value.postContent)
   form.resetForm();
  }
}
