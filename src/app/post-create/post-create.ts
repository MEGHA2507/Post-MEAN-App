import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { Post } from '../model/post.model';
import { CommonModule } from '@angular/common';
import { PostsService } from '../services/posts-service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-create',
  imports: [CommonModule, MatProgressSpinnerModule, FormsModule, MatInputModule, MatButtonModule, MatCard],
  templateUrl: './post-create.html',
  styleUrls: ['./post-create.scss'],
})
export class PostCreate implements OnInit{

  enteredContent = '';
  enteredTitle = '';
  // @Output() postCreated = new EventEmitter<Post>();

  private mode = 'create';
  private postId:any = null;
  post!:Post;
  postEditData = false;
isLoading = false;
  constructor(private postsService: PostsService,
    public route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      if(res.has('id')){
        this.mode = 'edit';
        this.postId = res.get('id');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((res: any) => {
          if(res){
            this.isLoading = false;
            console.log(res);
            this.post = {
              id: res._id,
              postTitle: res.postTitle,
              postContent: res.postContent
            }
            this.postEditData = true;
          }
         
        });
      }else{
        this.mode = 'create';
        this.postId = null;
         this.isLoading = false;
        this.post = {
            id: this.postId,
            postTitle: '',
            postContent: ''
          }
      }
      this.cd.detectChanges();
    })
  }

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
  this.isLoading = true;
  if(this.mode === 'create'){
      this.postsService.addPost('',form.value.postTitle, form.value.postContent);
      this.isLoading = false;
  }else{
    this.postsService.editPost(this.postId, form.value.postTitle, form.value.postContent);
    this.isLoading = false;
  }

   form.resetForm();
   
  }
}
