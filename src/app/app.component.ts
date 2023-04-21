import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course';
  postsList: Array<{title: string, content: string}>=[];

  postAdded(post: any){
    console.log(post);
    this.postsList.push(post);
  }
}
