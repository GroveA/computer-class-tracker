import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Group } from '../models/group.model';

@Injectable({ providedIn: 'root' })
export class GroupsService {
  private groups: Group[] = [];
  private groupsUpdated = new Subject<Group[]>();
  private groupSelected = new EventEmitter<Group>();
  private selectedGroup: Group;
  private groupChangeSubsription: any;

  constructor(private http: HttpClient, private toastr: ToastrService) {

    this.groupChangeSubsription = this.getGroupSelectedListener().subscribe((group: Group) => { this.selectedGroup = group; });

  }


  getLastSelectedGroup(): Group {
    return this.selectedGroup
  }

  getGroupByName(name: string): Group {
    var indx = this.groups.findIndex(g => {
      if (g.name === name) return true
    });
    return indx > -1 ? this.groups[indx] : null;
  }

  getGroups() {
    this.http
      .get<{ message: string; groups: any }>(
        'http://localhost:3000/api/groups'
      )
      .pipe(map((groupData) => {
        return groupData.groups.map(group => {
          return {
            name: group.name,
            id: group._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.groups = transformedPosts;
        this.groupsUpdated.next(this.groups.slice());
        console.log(this.selectedGroup)
        this.groupSelected.emit(this.selectedGroup)
      });
  }

  getGroupUpdateListener() {
    return this.groupsUpdated.asObservable();
  }

  addGroup(nameg: string) {
    const group: Group = { id: null, name: nameg};
    this.http
      .post<{ message: string, id: string }>('http://localhost:3000/api/groups', group)
      .subscribe(responseData => {
        const id = responseData.id;
        group.id = id;
        this.groups.push(group);
        this.groupsUpdated.next(this.groups.slice());

        this.toastr.show("Cтворено нову групу", "", {
          timeOut: 1000,
          extendedTimeOut: 0,
          positionClass: 'toast-bottom-right'
        }, 'toast-success')
      });
  }


  deleteGroup(groupId: string) {
    this.http.delete('http://localhost:3000/api/groups/' + groupId)
      .subscribe(() => {
        const updatedGroups = this.groups.filter(post => post.id !== groupId);
        this.groups = updatedGroups;
        this.groupsUpdated.next(this.groups.slice());
        this.groupSelected.emit(null);
        this.toastr.show("Успішно видалено групу", "", {
          timeOut: 1000,
          extendedTimeOut: 0,
          positionClass: 'toast-bottom-right'
        }, 'toast-success')
      });
  }


  getGroupSelectedListener() {
    return this.groupSelected;
  }
}
