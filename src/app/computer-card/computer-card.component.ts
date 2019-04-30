import { Component, OnInit, Input } from '@angular/core';
import { Computer } from '../models/computer.model';

@Component({
  selector: 'app-computer-card',
  templateUrl: './computer-card.component.html',
  styleUrls: ['./computer-card.component.css']
})
export class ComputerCardComponent implements OnInit {
  @Input() computer: Computer;

  round = Math.round;
  constructor() {

  }

  ngOnInit() {
  }


  getComputerTempeture(): number {
    return Math.max(
      this.computer.cpu ? this.computer.cpu.tempeture : 0,
      this.computer.gpu ? this.computer.gpu.tempeture  : 0,
      this.computer.hdd ? this.computer.hdd.tempeture : 0
      );
  }

  getComputerLoad(): number {
    return this.computer.cpu.loadTotal;
  }
}
