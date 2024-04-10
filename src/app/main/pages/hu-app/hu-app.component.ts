import { Component, Input, OnInit } from '@angular/core';
import { Hu } from '../../interfaces/app.interface';

@Component({
  selector: 'app-hu-module',
  templateUrl: './hu-app.component.html',
  styleUrl: './hu-app.component.css'
})
export class HuAppComponent implements OnInit {
  @Input() hus!: Hu[];

  ngOnInit(): void {
    console.log(this.hus)
  
  }
}
