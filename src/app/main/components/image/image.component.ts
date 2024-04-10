import { Component, Input } from '@angular/core';
import { App, Tecnology } from '../../interfaces/app.interface';

@Component({
  selector: 'app-image-technology',
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {
  @Input() idTecnology!: number;

  
  
}
