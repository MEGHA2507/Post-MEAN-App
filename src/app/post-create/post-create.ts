import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { Post } from '../model/post.model';
import { CommonModule } from '@angular/common';
import { PostsService } from '../services/posts-service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  imports: [CommonModule, MatProgressSpinnerModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCard],
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

  postForm!: FormGroup;
  imagePreview!: string;

  constructor(private postsService: PostsService,
    public route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ){

  }

  createPostForm(){
    this.postForm = new FormGroup({
      postTitle: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      postContent: new FormControl(null, {validators: [Validators.required]}),
      postImage: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    })
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.createPostForm();
    this.route.paramMap.subscribe((res) => {
      if(res.has('id')){
        this.mode = 'edit';
        this.postId = res.get('id');
        
        this.postsService.getPost(this.postId).subscribe((res: any) => {
          if(res){
           
            console.log(res);
            this.post = {
              id: res._id,
              postTitle: res.postTitle,
              postContent: res.postContent,
              imagePath: res.imagePath
            }
            this.postEditData = true;
             this.isLoading = false;
          }

          this.postForm.patchValue({
            postTitle: this.post.postTitle,
            postContent: this.post.postContent,
          });

        });
      }else{
        this.mode = 'create';
        this.postId = null;
         this.isLoading = false;
        this.postForm.patchValue({
            id: this.postId,
            postTitle: '',
            postContent: '',
            imagePath: ''
          });
      }
      this.cd.detectChanges();
    })
  }

  onSavePost() {
    if(this.postForm.invalid){
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
      this.postsService.addPost('', this.postForm.value.postTitle, this.postForm.value.postContent, this.postForm.value.postImage);
      this.isLoading = false;
  }else{
    this.postsService.editPost(this.postId, this.postForm.value.postTitle, this.postForm.value.postContent, this.postForm.value.postImage);
    this.isLoading = false;
  }

   this.postForm.reset();
   
  }

  onFilePicked(event:any){
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) {
      return;
    }

    this.postForm.patchValue({
      postImage: file
    });

    this.postForm.get('postImage')?.updateValueAndValidity();

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}
