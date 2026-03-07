import { Component , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
  message = 'An unknown error occured!!';
}
