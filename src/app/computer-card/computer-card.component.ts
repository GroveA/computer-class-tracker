import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Computer } from '../models/computer.model';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-computer-card',
  templateUrl: './computer-card.component.html',
  styleUrls: ['./computer-card.component.css']
})
export class ComputerCardComponent implements OnInit, DoCheck {

  @Input() computer: Computer;

  round = Math.round;
  constructor() {
    console.log(' created :-P');
  }

  tempValue = 0;
  loadValue = 0;

  tempOptions = {
    startVal: 0,
    suffix: '°C',
    decimalPlaces: 1
  };

  loadOptions = {
    startVal: 0,
    suffix: '%',
    decimalPlaces: 1
  };


  ngOnInit() {
  }

  ngDoCheck() {
    this.tempOptions.startVal = this.tempValue;
    this.loadOptions.startVal = this.loadValue;
    this.tempValue = this.computer.tempeture;
    this.loadValue = this.computer.cpuLoad;
  }

}
