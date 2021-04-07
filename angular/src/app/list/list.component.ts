import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  users$: any;
  userData = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.users$ = this.userService.getUser().subscribe((res: any) => {
      console.log('Data :: ', res)
      this.userData = [...res]
    }, err => {
      console.log('Error :: ', err)
    })
  }

  ngOnDestroy(): void {
    if (this.users$) this.users$.unsubscribe()
  }

}
