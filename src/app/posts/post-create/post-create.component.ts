import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  newPost = 'NO CONTENT';
  enteredValue = '';

  // onAddPost(postData: HTMLTextAreaElement){
  //   console.dir(postData);

  //  // alert("Post added !!");
  //   this.newPost = postData.value;
  // }

  onAddPost(){


   // alert("Post added !!");
    this.newPost = this.enteredValue;
  }
}
