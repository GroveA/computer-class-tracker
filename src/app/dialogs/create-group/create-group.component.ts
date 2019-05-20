import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { NgForm } from '@angular/forms';
import { GroupsService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {


  constructor(private groupsService: GroupsService,
              private dialogRef: MatDialogRef<CreateGroupComponent>) {
  }

  ngOnInit() {

  }

  onAddGroup(form: NgForm) {
    if (form.invalid) { return; }
    this.groupsService.addGroup(form.value.nameg);
    this.save();
  }

  save() {
      this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }
}
