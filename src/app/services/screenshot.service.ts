import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Group } from '../models/group.model';
import { ScreenShot } from '../models/screenshot.model';

@Injectable({ providedIn: 'root' })
export class ScreenShotService {
  private screenshots: ScreenShot[] = [];
  private updated = new EventEmitter();
  private selectedGroup: Group;
  private groupChangeSubsription: any;
    screenshotUpdater: any;

  constructor(private http: HttpClient) {


    this.screenshotUpdater = interval(2000)
    .pipe(
      startWith(0),
      switchMap(() => this.http.get<ScreenShot[]>(
        'http://localhost:3000/api/computers/screenshot'
        ))
    ).subscribe(res => {
        this.screenshots = res;

        this.updated.emit();
    });
  }


  getByComputer(computerId: string): ScreenShot[] {
    return this.screenshots.filter(sh => sh.computer === computerId);
  }

  getByComputerLast(computerId: string) : ScreenShot {
    return this.screenshots.slice().reverse().find(sh => sh.computer === computerId)
  }

  getUpdateListener() {
    return this.updated.asObservable();
  }

}
