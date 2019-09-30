import { Component } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public date: string;

  constructor() {
    this.date = format(new Date(), 'PPPP');
  }
}
