import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Group } from '../models/group.model';

@Injectable({ providedIn: 'root' })
export class GroupsService {
  private groups: Group[] = [];
  private groupsUpdated = new Subject<Group[]>();

  constructor(private http: HttpClient) {}

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
        this.groupsUpdated.next([...this.groups]);
      });
  }

  getGroupUpdateListener() {
    return this.groupsUpdated.asObservable();
  }

  addGroup(nameg: string) {
    const group: Group = { id: null, name: nameg};
    this.http
      .post<{ message: string, groupId: string }>('http://localhost:3000/api/groups', group)
      .subscribe(responseData => {
        const id = responseData.groupId;
        group.id = id;
        this.groups.push(group);
        this.groupsUpdated.next([...this.groups]);
      });
  }

  deleteGroup(groupId: string) {
    this.http.delete('http://localhost:3000/api/groups/' + groupId)
      .subscribe(() => {
        const updatedGroups = this.groups.filter(post => post.id !== groupId);
        this.groups = updatedGroups;
        this.groupsUpdated.next([...this.groups]);
      });
  }
}
