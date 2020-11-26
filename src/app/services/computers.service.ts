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
    this.postUpdater = interval(1500)
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
    this.http
    .post<{message: string}>(`http://localhost:3000/api/computers/${computerID}/group`, { groupId: groupID })
    .subscribe(res => {
      this.computers.find(comp => comp._id === computerID).groupId = groupID;
      this.computersUpdated.next(this.computers.slice());
    })
  }

  getComputerById(id: string): Computer {
    var indx = this.computers.findIndex(comp => {
      if (comp._id === id) return true
    });
    return indx > -1 ? this.computers[indx] : null;
  }

  updateComputerName(id: string, name: string) {
    if (this.getComputerById(id).name === name) return;

    this.http
    .post<{message: string}>(`http://localhost:3000/api/computers/${id}/name`, { name: name })
    .subscribe(res => {
      this.getComputerById(id).name = name;
      this.computersUpdated.next(this.computers.slice());
    });

  }


  getComputers() {
    return this.computers.slice();
  }




}
