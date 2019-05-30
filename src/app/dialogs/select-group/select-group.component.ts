import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GroupsService } from 'src/app/services/group.service';
import { NgForm } from '@angular/forms';
import { Group } from 'src/app/models/group.model';
import { Subscription } from 'rxjs';
import { ComputersService } from 'src/app/services/computers.service';

@Component({
  selector: 'app-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.scss']
})

export class SelectGroupComponent implements OnInit, OnDestroy {

  groups: Group[];

  computerId: string;

  private groupUpdateSubscription: Subscription;

  constructor(private groupsService: GroupsService,
              private computersService: ComputersService,
              private dialogRef: MatDialogRef<SelectGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.computerId = data.computerId;
}

ngOnInit() {
  this.groupUpdateSubscription =
    this.groupsService.getGroupUpdateListener().subscribe(gr => this.groups = gr);
  this.groupsService.getGroups();
}

ngOnDestroy(): void {
  this.groupUpdateSubscription.unsubscribe();
}

onSelectGroup(form: NgForm) {
  if (form.invalid) { return; }
  console.log(form.value);
  this.computersService.updateComputerGroup(this.computerId, form.value.selectedGroup);
  this.save();
}

save() {
  this.dialogRef.close();
}

close() {
  this.dialogRef.close();
}
}
