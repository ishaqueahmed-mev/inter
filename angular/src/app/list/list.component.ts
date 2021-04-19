import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { environment } from "../../environments/environment";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  users$: any;
  userData = [];
  env = environment;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.users$ = this.userService.getUser().subscribe((res: any) => {
      console.log('Data :: ', res)
      this.userData = [...res];
      
    }, err => {
      console.log('Error :: ', err)
    })
  }

  setProfileImage(evt) {
    evt.target.src = "assets/images/noimage.jpeg";
  }

  ngOnDestroy(): void {
    if (this.users$) this.users$.unsubscribe()
  }

}
