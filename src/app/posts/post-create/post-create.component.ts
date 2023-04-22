import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  newPost = 'NO CONTENT';
  enteredContent = '';
  enteredTitle = '';

  // @Output() addPost = new EventEmitter<Post>();

  constructor(private postService: PostService){}

  // onAddPost(postData: HTMLTextAreaElement){
  //   console.dir(postData);

  //  // alert("Post added !!");
  //   this.newPost = postData.value;
  // }

  onAddPost(form: NgForm){

  //  // alert("Post added !!");
  //   this.newPost = this.enteredContent;

  // const post = {title: this.enteredTitle, content: this.enteredContent};

  if(form.invalid){
    return;
  }
  const post = {title: form.value.title, content: form.value.content};

  this.postService.addPost(post);
  // this.addPost.emit(post);
  form.resetForm();
  }

}
