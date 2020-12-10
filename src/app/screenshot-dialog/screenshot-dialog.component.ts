import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScreenShot } from '../models/screenshot.model';

@Component({
  selector: 'app-screenshot-dialog',
  templateUrl: './screenshot-dialog.component.html',
  styleUrls: ['./screenshot-dialog.component.scss']
})
export class ScreenshotDialogComponent implements OnInit {

  screenshot: ScreenShot;

  constructor(@Inject(MAT_DIALOG_DATA) data) { 
    this.screenshot = data.screenshot;
  }

  ngOnInit(): void {
  }

  getScreenURL() {
    return "http://localhost:3000/computers/" + this.screenshot.computer + '/' + this.screenshot.name + '.png';
  }
}
