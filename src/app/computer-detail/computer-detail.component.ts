import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComputersService } from '../services/computers.service';
import { RouterStateSnapshot, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Computer } from '../models/computer.model';

@Component({
  selector: 'app-computer-detail',
  templateUrl: './computer-detail.component.html',
  styleUrls: ['./computer-detail.component.scss']
})
export class ComputerDetailComponent implements OnInit, OnDestroy {
  id: string;
  computer: Computer;



  constructor(private http: HttpClient, private computersServics: ComputersService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    let s = this.computersServics.getComputersUpdateListener().subscribe(comps =>
      {
        this.computer = comps.find(c => c._id === this.id);
        s.unsubscribe();
        console.log(this.computer);

      }
    );
  }

  ngOnInit() {



  }

  ngOnDestroy(): void {

  }

}
