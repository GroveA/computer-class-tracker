import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComputersService } from '../services/computers.service';
import { Computer } from '../models/computer.model';
import { Subscription } from 'rxjs';
import { Group } from '../models/group.model';
import { GroupsService } from '../services/group.service';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnInit, OnDestroy {

  private selectedGroup: Group = null;

  public computers: Computer[] = [];

  private updateSubsription: Subscription;
  private groupChangeSubsription: Subscription;

  constructor(private computersService: ComputersService,
              private groupsService: GroupsService) { }

  ngOnInit() {
    this.updateSubsription = this.computersService
    .getComputersUpdateListener()
    .subscribe((updatedComputers => this.updateComputerList(updatedComputers)));
    this.groupChangeSubsription = this.groupsService.getGroupSelectedListener().subscribe((group: Group) => {this.selectedGroup = group; console.log(this.selectedGroup);});
  }

  ngOnDestroy() {
    this.updateSubsription.unsubscribe();
    this.groupChangeSubsription.unsubscribe();
  }

  private updateComputerList(updatedList: Computer[]){
    updatedList.forEach((updatedComputer) => {
      const computerIndex = this.computers.findIndex(comp => comp._id === updatedComputer._id);
      if (computerIndex === -1) {
        this.computers.push(updatedComputer);
      } else {
        const difference = this.getDifference(this.computers[computerIndex], updatedComputer);
        Object.keys(difference).forEach(key => {
          this.computers[computerIndex][key] = difference[key];
        });
      }
    });
  }

  private getDifference(computer1: Computer, computer2: Computer): object {
    const diff: object = Object.keys(computer2).reduce((diff, key) => {
      if (computer1[key] === computer2[key]) { return diff; }
      return {
        ...diff,
        [key]: computer2[key]
      };
    }, {});
    return diff;
  }

  public getOnline(): number {
    return this.getComputersByGroup().filter(comp => comp.online).length;
  }

  getComputersByGroup(): Computer[] {
    if (this.selectedGroup == null) { return this.computers; }
    return this.computers.filter(comp => comp.groupId === this.selectedGroup.id);
  }
}
