import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Angular Eduardo';
  curso: string = 'Curso de Angular 8';
  profesor: string = 'Andrés Guzmán';

}
