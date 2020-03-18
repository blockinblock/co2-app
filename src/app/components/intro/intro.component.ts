import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})

export class IntroComponent {

  constructor(public dialogRef: MatDialogRef<IntroComponent>) { }

  onClickClose(): void {
    this.dialogRef.close(true);
  }
}
