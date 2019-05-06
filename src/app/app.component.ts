import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Computer } from './models/computer.model';
import { map } from 'rxjs/operators';
import { ComputersService } from './services/computers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private breakpointObserver: BreakpointObserver, public computersService: ComputersService) {

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  title = 'computer-class-tracker';

  // public computer: Computer = {
  //   name: 'Computer #1',
  //   hostName:  'DESKTOP-NMEV3MP',
  //   online: true,
  //   macAddress: '01.AC.1B.5D',
  //   ipAddress: '192.168.0.1',
  //   motherboard: 'asus bh012',
  //   cpu: {
  //     name: 'intel core i5-4870HQ',
  //     loadTotal : 33.01,
  //     coresLoad: [13.03, 33.45],
  //     coresTempeture: [45, 66.4],
  //     tempeture: 78.3
  //   },
  //   ram: {
  //     memoryUsed: 6.4,
  //     memoryTotal: 7.9
  //   }
  // };
}
