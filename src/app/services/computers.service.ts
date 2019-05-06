import { Injectable, OnInit, OnDestroy } from '@angular/core';

import { Computer } from '../models/computer.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ComputersService implements OnInit, OnDestroy {

  private computers: Computer[] = [];
  private computersUpdated = new Subject<Computer[]>();
  private postUpdater: Subscription;
  constructor(public http: HttpClient) {
    console.log('constructor');
    this.postUpdater = interval(3000)
    .pipe(
      startWith(0),
      switchMap(() => this.http.get<Computer[]>(
        'http://localhost:3000/api/computers'
        ))
    ).subscribe(res => {
      this.computers = res;
      this.computersUpdated.next([...this.computers]);
    });
  }

  ngOnInit() {
    console.log('init');

  }

  ngOnDestroy() {
    this.postUpdater.unsubscribe();
    console.log('destory');
  }

  getComputersUpdateListener() {
    return this.computersUpdated.asObservable();
  }

  getComputers() {
    return [...this.computers];
  }




}
