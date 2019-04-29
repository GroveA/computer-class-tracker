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

}
