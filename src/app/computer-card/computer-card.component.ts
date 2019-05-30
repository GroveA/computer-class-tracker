import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Computer } from '../models/computer.model';
import { MatDialog } from '@angular/material';
import { SelectGroupComponent } from '../dialogs/select-group/select-group.component';

@Component({
  selector: 'app-computer-card',
  templateUrl: './computer-card.component.html',
  styleUrls: ['./computer-card.component.css']
})
export class ComputerCardComponent implements OnInit, DoCheck {

  @Input() computer: Computer;

  round = Math.round;

  constructor(private dialog: MatDialog) {}

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

  selectGroup() {
    this.dialog.open(SelectGroupComponent, {
      data: { computerId : this.computer._id}
    });
  }

}
