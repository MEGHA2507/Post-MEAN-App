import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { Post } from '../post-list/post-list';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, MatInputModule, MatButtonModule, MatCard],
  templateUrl: './post-create.html',
  styleUrls: ['./post-create.scss'],
})
export class PostCreate {

  enteredContent = '';
  enteredTitle = '';
  @Output() postCreated = new EventEmitter();


  onSavePost() {
   const post: Post = {
    title: this.enteredTitle,
    content: this.enteredContent
   }
   this.postCreated.emit(post);
  }
}
