import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComputersService } from 'src/app/services/computers.service';

@Component({
  selector: 'app-computer-name',
  templateUrl: './computer-name.component.html',
  styleUrls: ['./computer-name.component.scss']
})
export class ComputerNameComponent implements OnInit {

  constructor(private computersService: ComputersService,
    private dialogRef: MatDialogRef<ComputerNameComponent>, @Inject(MAT_DIALOG_DATA) public data: {_id: string, name: string}) {

  }

  ngOnInit() {

  }

  onNameSave(form: NgForm) {
    if (form.invalid) { return; }
      this.computersService.updateComputerName(this.data._id , form.value.nameg);
      this.save();
  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
