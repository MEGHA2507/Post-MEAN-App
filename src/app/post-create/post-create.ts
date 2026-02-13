import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { Post } from '../model/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-create',
  imports: [CommonModule,FormsModule, MatInputModule, MatButtonModule, MatCard],
  templateUrl: './post-create.html',
  styleUrls: ['./post-create.scss'],
})
export class PostCreate {

  enteredContent = '';
  enteredTitle = '';
  @Output() postCreated = new EventEmitter<Post>();


  onSavePost(form: NgForm) {
    if(form.invalid){
      return;
    }
    console.log(form.value)
   const post: Post = {
    title: form.value.postTitle,
    content: form.value.postContent
   }
   this.postCreated.emit(post);
   form.resetForm();
  }
}
