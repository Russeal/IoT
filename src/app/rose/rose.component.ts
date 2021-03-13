import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rose',
  templateUrl: './rose.component.html',
  styleUrls: ['./rose.component.scss']
})
export class RoseComponent implements OnInit {

  public checkModel: any = { left: true, middle: false, right: false };
  public radioModel: string = 'Left';

  constructor() {}

  ngOnInit(): void {
    if (true) {
      this.checkModel = { left: false, middle: true, right: false };
      this.radioModel = 'Middle';
    }
  }
  
}
