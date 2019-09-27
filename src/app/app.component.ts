import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private apiService: ApiService) {
    this.apiService
      .getCityForecast(524901) // TODO dynamic lack
      .subscribe(data => console.log(data), error => console.error(error)); // TODO show a user friendly message
  }
}
