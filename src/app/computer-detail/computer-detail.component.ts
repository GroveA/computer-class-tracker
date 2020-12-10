import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComputersService } from '../services/computers.service';
import { ActivatedRoute, } from '@angular/router';
import { Subscription, interval, from } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';
import { Computer } from '../models/computer.model';
import { Indicators } from '../models/indicators.model';
import { Chart } from 'chart.js';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ScreenShot } from '../models/screenshot.model';
import { ScreenShotService } from '../services/screenshot.service';

@Component({
  selector: 'app-computer-detail',
  templateUrl: './computer-detail.component.html',
  styleUrls: ['./computer-detail.component.scss'],
  animations: [
    trigger('animWidth', [
      state('change', style({
        width: '*',
      })),
      transition('* <=> *', animate('400ms ease-in-out')),
    ])
  ]
})
export class ComputerDetailComponent implements OnInit, OnDestroy, DoCheck {


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

  id: string;
  computer: Computer;
  indicators: Indicators[] = [];
  current: Indicators = null;
  prev: Indicators = null;
  cpuLength: Array<number>;
  private indicatorsUpdater: Subscription;
  chart = [];
  MATHR = Math.round;
  now: number;
  screenshotUpdater: Subscription;
  lastScreen: ScreenShot;
  shSub: Subscription;


  constructor(private http: HttpClient, private computersServics: ComputersService, private route: ActivatedRoute, private screenShotService: ScreenShotService) {

    

    this.id = this.route.snapshot.paramMap.get('id');
    const s = this.computersServics.getComputersUpdateListener().subscribe(comps => {
        this.computer = comps.find(c => c._id === this.id);
        s.unsubscribe();
        this.beginIncatorsUpdate()
      }
    );
    this.lastScreen = screenShotService.getByComputerLast(this.id);

    this.shSub = screenShotService.getUpdateListener().subscribe(() => {
      this.lastScreen = screenShotService.getByComputerLast(this.id);
    })



  }
  ngDoCheck(): void {
  }

  getDateNow() {
    return Date.now()
  }

  beginIncatorsUpdate() {
    this.indicatorsUpdater = interval(2000)
    .pipe(
      startWith(0),
      switchMap(() => this.http.get<Indicators[]>(
        'http://localhost:3000/api/computers/' + this.id + "&" + this.indicators.length, 
        ).pipe(map((computerData) => {
          return computerData.map(comp => {
            comp.computerId = comp.computer;
            return comp;
          });
        })),
        )
    ).subscribe(res => {
      console.log(res);
      if (this.indicators.length === 0) {
        this.indicators = res;


        // this.buildChart();
      } else {
        this.indicators.push( ...res);
      }

      const dateDiff = Math.abs(new Date().getTime() - new Date(this.indicators[this.indicators.length - 1 ].date).getTime());

      const minuteDiff = Math.floor(dateDiff / 1000 / 60);

      this.now = dateDiff / 1000 ;

      if (minuteDiff < 10) {
        this.prev = this.current;

        this.current = this.indicators[this.indicators.length - 1];

        if (!this.cpuLength || this.cpuLength.length !== this.current.CPU.Cores)
          this.cpuLength = new Array(this.current.CPU.Cores)

      } else {
        this.current = null;
        this.computer.online = false;
      }
      this.computer.lastUpdate = this.indicators[this.indicators.length - 1].date;
        
      // this.computer.online = Math.abs(new Date().getTime() - new Date(this.computer.lastUpdate).getTime()) / 1000 > 10 ? false : true


    });
  }

  beginScreenShotsUpdate() {
    this.screenshotUpdater = interval(10000)
    .pipe(
      startWith(0),
      switchMap(() => this.http.get<ScreenShot[]>(
        'http://localhost:3000/api/computers/' + this.id + "/screenshot", 
        ))
    ).subscribe(res => {
      console.log(res)
    });
  }

  getAverageCPUTemp() {
    var avg = 0;
    this.indicators.forEach(i => {
      var temp = 0;
      i.CPU.Tempeture.forEach(t => temp += t);
      avg += temp / i.CPU.Tempeture.length;
    })

    avg /= this.indicators.length;

    return avg;
  }
  getAverageGPUTemp() {
    var avg = 0;
    this.indicators.forEach(i => {
      i.GPU && (avg += i.GPU.Tempeture)
    })

    avg /= this.indicators.length;

    return avg;
  }

  ngOnInit() {

  }

  getLastSHURL() {

    return this.lastScreen ? "http://localhost:3000/computers/" + this.lastScreen.computer + '/' + this.lastScreen.name + '.png': "";

  }

  buildChart() {
  //   let data1 = {
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //     datasets: [
  //         {
  //             label: 'Активність',
  //             backgroundColor: 'rgba(98, 150, 247, 0.2)',
  //             borderColor: 'rgba(98, 150, 247, 1)',
  //             borderWidth: 2,
  //             hoverBackgroundColor: 'rgba(98, 150, 247, 0.4)',
  //             hoverBorderColor: 'rgba(98, 150, 247, 1)',
  //             data: [0, 0, 1, 5, 7, 3, 0],
  //         }
  //     ]
  // };
  //   const option = {
  //   scales: {
  //     yAxes: [{
  //         stacked: true,
  //         gridLines: {
  //           display: true,
  //           color: 'rgba(255,99,132,0.2)'
  //         }
  //     }],
  //     xAxes: [{
  //         gridLines: {
  //           display: false
  //         }
  //     }]
  //   }
  // };

  //   this.chart = new Chart('canvas', {
  //   type: 'bar',
  //   data: data1,
  //   options: option
  // });
  }
  ngOnDestroy(): void {
    this.indicatorsUpdater && this.indicatorsUpdater.unsubscribe();
    this.screenshotUpdater && this.screenshotUpdater.unsubscribe();
    this.shSub.unsubscribe()
  }


  getRAM(used: boolean): number {
    if (used) {
      return Math.round(this.current.RAM.UsedMemory / ((this.current.RAM.AvaliableMemory + this.current.RAM.UsedMemory) / 100));
    } else {
      return Math.round(this.current.RAM.AvaliableMemory / ((this.current.RAM.AvaliableMemory + this.current.RAM.UsedMemory) / 100)  );
    }
  }

}
