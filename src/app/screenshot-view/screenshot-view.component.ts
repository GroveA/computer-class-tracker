import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScreenShot } from '../models/screenshot.model';
import { ScreenshotDialogComponent } from '../screenshot-dialog/screenshot-dialog.component';
import { ScreenShotService } from '../services/screenshot.service';

@Component({
  selector: 'app-screenshot-view',
  templateUrl: './screenshot-view.component.html',
  styleUrls: ['./screenshot-view.component.scss']
})
export class ScreenshotViewComponent implements OnInit, OnDestroy {
  id: string;

  mappedScreens : {[key: string]: ScreenShot[]} = {}
  orderScreens: number[] = [];

  private screenshots : ScreenShot[] = [];
  updater: Subscription;

  constructor( private route: ActivatedRoute, private screenShotService: ScreenShotService, public dialog: MatDialog ) {

    this.id = this.route.snapshot.paramMap.get('id');


    this.onNewScreenShots();
    this.updater = screenShotService.getUpdateListener().subscribe(this.onNewScreenShots.bind(this))

   }


   onNewScreenShots() {
    var newSH = this.screenShotService.getByComputer(this.id);
   
    if (newSH.length !== this.screenshots.length) {
      var toAdd = newSH.slice(this.screenshots.length);
      this.screenshots.push(...toAdd)

      this.addToMap(toAdd);

    }
  }

   addToMap(newSH: ScreenShot[]) {
    newSH.forEach(screen => {

      var dateNum = Date.parse(screen.date)
      var date = new Date(dateNum)

      var key = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
      if (this.mappedScreens[key]) {
        this.mappedScreens[key].unshift(screen);
      } else {
        this.orderScreens.push(dateNum);
        this.mappedScreens[key] = [screen]
      }
    })

    this.orderScreens.sort((a,b) =>  a > b ? a : b).reverse();
   }

  getScreenURL(screenshot: ScreenShot) {
    return "http://localhost:3000/computers/" + screenshot.computer + '/' + screenshot.name + '.png';
  }

  getDateKey(n: number) { 
    var d =  new Date(n);
    return  d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear();
  }

  ngOnInit(): void {
  }

  openScreenShot(screenshot: ScreenShot) {
    this.dialog.open(ScreenshotDialogComponent, { 
      autoFocus: true,
      data: {
        screenshot: screenshot
      }
    });
  }

  ngOnDestroy(): void {
    this.updater.unsubscribe()
  }

}