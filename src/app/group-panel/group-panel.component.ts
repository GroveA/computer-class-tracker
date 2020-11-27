import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsService } from '../services/group.service';

import { Group } from '../models/group.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from '../dialogs/create-group/create-group.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-panel',
  templateUrl: './group-panel.component.html',
  styleUrls: ['./group-panel.component.scss']
})
export class GroupPanelComponent implements OnInit, OnDestroy {
  private groupUpdateSubscription: Subscription;
  private selectedGroup: Group;
  groups: Group[];
  private groupChangeSubscription: Subscription;

  constructor(private groupsService: GroupsService,
              private dialog: MatDialog,
              private toastr: ToastrService,
              private route: ActivatedRoute
              ) {

                
      }

  ngOnInit() {

    this.groupsService.getGroups();
    this.groupUpdateSubscription = this.groupsService.getGroupUpdateListener().subscribe(updatedGroups => this.groups = updatedGroups);
    this.groupChangeSubscription = this.groupsService.getGroupSelectedListener().subscribe(group => this.selectedGroup = group);
  }

  ngOnDestroy(): void {
    this.groupUpdateSubscription.unsubscribe();
    this.groupChangeSubscription.unsubscribe();
  }


  createGroup(): void {
    this.dialog.open(CreateGroupComponent);
  }

  removeGroup() {
    if (this.selectedGroup) 
      this.groupsService.deleteGroup(this.selectedGroup.id)
    else 
      this.toastr.show("Цю групу неможливо видалити", "", {
        timeOut: 1000,
        extendedTimeOut: 0,
        positionClass: 'toast-bottom-right'
      }, 'toast-error')
  }

  selectGroup(group: Group): void{
    this.selectedGroup = group;
    this.groupsService.getGroupSelectedListener().emit(this.selectedGroup);
  }

}
