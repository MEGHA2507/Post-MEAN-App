import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-post-create',
  imports: [FormsModule, MatInputModule, MatButtonModule, MatCard],
  templateUrl: './post-create.html',
  styleUrls: ['./post-create.scss'],
})
export class PostCreate {

  enterValue = '';

  newPost = 'NO CONTENT';

  onSavePost() {
   
    this.newPost = this.enterValue;

  }
}
