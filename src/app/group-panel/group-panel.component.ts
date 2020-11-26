import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsService } from '../services/group.service';

import { Group } from '../models/group.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from '../dialogs/create-group/create-group.component';

@Component({
  selector: 'app-group-panel',
  templateUrl: './group-panel.component.html',
  styleUrls: ['./group-panel.component.scss']
})
export class GroupPanelComponent implements OnInit, OnDestroy {
  private groupUpdateSubscription: Subscription;
  private selectedGroup: Group;
  groups: Group[];

  constructor(private groupsService: GroupsService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.groupsService.getGroups();
    this.groupUpdateSubscription = this.groupsService.getGroupUpdateListener().subscribe(updatedGroups => this.groups = updatedGroups);
  }

  ngOnDestroy(): void {
    this.groupUpdateSubscription.unsubscribe();
  }


  createGroup(): void {
    this.dialog.open(CreateGroupComponent);
  }


  selectGroup(group: Group): void{
    this.selectedGroup = group;
    this.groupsService.getGroupSelectedListener().emit(this.selectedGroup);
  }

}
