import { Injectable, OnInit, OnDestroy } from '@angular/core';

import { Computer } from '../models/computer.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription, interval } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ComputersService implements OnInit, OnDestroy {

  private computers: Computer[] = [];
  private computersUpdated = new Subject<Computer[]>();
  private postUpdater: Subscription;
  constructor(public http: HttpClient) {
    this.postUpdater = interval(3000)
    .pipe(
      startWith(0),
      switchMap(() => this.http.get<Computer[]>(
        'http://localhost:3000/api/computers'
        ).pipe(map((computerData) => {
          return computerData.map(comp => {
            comp.groupId = comp.group;
            return comp;
          });
        })),
        )
    ).subscribe(res => {
      this.computers = res;
      this.computersUpdated.next(this.computers.slice());
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.postUpdater.unsubscribe();
  }

  getComputersUpdateListener() {
    return this.computersUpdated.asObservable();
  }

  updateComputerGroup(computerID: string, groupID: string) {
    console.log(groupID);
    this.http
    .post<{message: string}>(`http://localhost:3000/api/computers/${computerID}/group`, { groupId: groupID })
    .subscribe(res => {
      this.computers.find(comp => comp._id === computerID).groupId = groupID;
      this.computersUpdated.next(this.computers.slice());
    })
  }

  getComputerById(id: string): Computer {
    this.computers.forEach(comp => {
      if (comp._id === id) { return comp; }
    });
    return null;
  }

  getComputers() {
    return this.computers.slice();
  }




}
