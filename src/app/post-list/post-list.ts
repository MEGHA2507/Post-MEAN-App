import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../model/post.model';
import { PostsService } from '../services/posts-service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule, MatProgressSpinnerModule, RouterLink ,CommonModule, MatButtonModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList implements OnInit, OnDestroy{
  // @Input() 
  // posts: Post[] = [
  //   // {
  //   //   title: 'First Post', 
  //   //   content: 'This is the first post\'s content'
  //   // },
  //   //  {
  //   //   title: 'Second Post', 
  //   //   content: 'This is the second post\'s content'
  //   // },
  //   //  {
  //   //   title: 'Third Post', 
  //   //   content: 'This is the third post\'s content'
  //   // }
  // ]
  posts: Post[]=[];
  private postsSub!: Subscription;
  postResponseAvailable = false;
isLoading = false;

    constructor(
      private postsService: PostsService, 
      private cd: ChangeDetectorRef){}

    ngOnInit(): void {
      this.isLoading = true;
       this.postsService.getPosts();
      this.postsSub = this.postsService
        .getPostUpdateLister()
        .subscribe((res: Post[]) => {
          if(res){
            this.isLoading = false;
             this.posts = res;
              this.cd.detectChanges(); 
          }
         
          
        });
       
     
    } 

    onDelete(id:string){
      console.log(id)
      this.postsService.deletePost(id);
    }

    onEdit(post: Post){

    }

    ngOnDestroy(): void {
      this.postsSub.unsubscribe();
    }
  
}

