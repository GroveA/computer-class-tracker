import { Component } from '@angular/core';

import { Computer } from './models/computer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'computer-class-tracker';
  public computer: Computer = {
    name: 'Coputer #1',
    hostName:  'DESKTOP-NMEV3MP',
    macAddress: '01.AC.1B.5D',
    ipAddress: '192.168.0.1',
    motherboard: 'asus bh012',
    cpu: {
      name: 'intel core i5-4870HQ',
      loadTotal : 33.01,
      coresLoad: [13.03, 33.45],
      coresTempeture: [45, 66.4],
      tempeture: 78.3
    },
    ram: {
      memoryUsed: 6.4,
      memoryTotal: 7.9
    }
  };
}
