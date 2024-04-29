import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Stage } from '../../interfaces/app.interface';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnChanges  {
  
  @Input() stage!: Stage[];
  public color: string = '';
  public descripcion: string = ''; 

  ngOnChanges(): void  {
    this.descripcion = this.stage[0].description;

    
    switch(this.stage[0].id){
      case 1:
        this.color ="#CECECE";
        break;
      case 2:
        this.color ="#FFDE59"
        break;  
      case 3:
        this.color ="#CC6CE7"
        break;  
      case 4:
        this.color ="#7DDA58"
        break;   

    }
  }
  
}
