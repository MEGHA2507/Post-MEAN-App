import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreate } from "./post-create/post-create";
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostCreate, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mean-ui-code');
}
