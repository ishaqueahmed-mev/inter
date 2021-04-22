import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { environment } from "../../environments/environment";
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import * as moment from "moment";



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  users$: any;
  userData = [];
  userLength;
  pageCounts = [];
  dataLimit = 10;
  currentPage: number = 1;
  extraParams = {};
  searchChanged = new Subject<string>();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();

    // When search is done, value is typed in input box, and searchChanged variable
    // is changed from search method, so again subscribed.
    this.searchChanged.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(s => {
        this.extraParams['search'] = s;
        this.getUsers()
      });
  }

  getUsers() {
    let userObj = {
      'startLimit': (this.currentPage - 1) * this.dataLimit,
      'endLimit': this.dataLimit,
      ...this.extraParams
    };
    console.log(userObj)
    this.users$ = this.userService.getUser(userObj).subscribe((res: any) => {
      this.pageCounts = [];
      console.log('Data :: ', res)
      this.userData = [...res.data];
      this.userLength = res.length;
      this.filterData();
      this.setPagination();
    }, err => {
      console.log('Error :: ', err)
    })
  }

  filterData() {
    this.userData.map(x => {
      x.profile = x.profile ? `${environment.imageUrl}${x.profile}` : 'assets/images/noimage.jpeg';
    })
  }

  setPagination() {
    let length = (this.userLength / this.dataLimit) + 1;
    for (let i = 0; i < length - 1; i++) this.pageCounts.push(i + 1);
  }

  switchPage(arg?) {
    this.currentPage = +arg;
    this.getUsers();
  }

  setProfileImage(evt) {
    evt.target.src = "assets/images/noimage.jpeg";
  }

  edit(id) {

  }

  delete(id) {
    let confirm = window.confirm('Are you sure to delete the user?');
    if (!confirm) return;
    this.userService.deleteUser(id).subscribe(result => {
      this.getUsers(); // To update list

      // Workout without pagination
      // let delIndex = this.userData.findIndex(u => u._id == id);
      // if (delIndex != -1) this.userData.splice(delIndex, 1);
    }, err => console.log(err))
  }

  search(term: string) {
    this.searchChanged.next(term);
  }

  ngOnDestroy(): void {
    if (this.users$) this.users$.unsubscribe()
  }

}
