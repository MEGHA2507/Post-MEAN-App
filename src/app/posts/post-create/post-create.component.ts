import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  newPost = 'NO CONTENT';
  enteredContent = '';
  enteredTitle = '';

  @Output() addPost = new EventEmitter();

  // onAddPost(postData: HTMLTextAreaElement){
  //   console.dir(postData);

  //  // alert("Post added !!");
  //   this.newPost = postData.value;
  // }

  onAddPost(){

  //  // alert("Post added !!");
  //   this.newPost = this.enteredContent;

  const post = {title: this.enteredTitle, content: this.enteredContent};

  this.addPost.emit(post);
  }
}
