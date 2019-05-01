import { Injectable } from '@angular/core';

import { Computer } from '../models/computer.model';

@Injectable({
  providedIn: 'root'
})
export class ComputersService {
  private computers: Computer[] = [];

  getComputers() {
    return [...this.computers];
  }

  constructor() { }
}
