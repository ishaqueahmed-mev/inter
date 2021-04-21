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
  tooltips = [];
  colors = ['red', 'green', 'orange'];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    // this.JustROCThings()
  }

  getUsers() {
    this.users$ = this.userService.getUser().subscribe((res: any) => {
      console.log('Data :: ', res)
      this.userData = [...res.data];

    }, err => {
      console.log('Error :: ', err)
    })
  }

  setProfileImage(evt) {
    evt.target.src = "assets/images/noimage.jpeg";
  }

  delete(id) {
    let confirm = window.confirm('Are you sure to delete the user?');
    if (!confirm) return;
    this.userService.deleteUser(id).subscribe(result => {
      console.log('User deleted successfully', result)
      let delIndex = this.userData.findIndex(u => u._id == id);
      if (delIndex != -1) this.userData.splice(delIndex, 1);
    }, err => console.log(err))
  }

  JustROCThings() {
    this.tooltips = [
      {
        "drink": ["swallow", "assist", "encourage"]
      }, {
        "eat": ["swallow", "assist", "encourage"]
      }, {
        "holistic": ["hearing", "vision", "speech", "recognition"]
      }
    ]

    let newArr = [];
    for (let i = 0; i < this.tooltips.length; i++) {
      let obj = this.tooltips[i];
      for (const key in obj) {
        const element = obj[key];
        console.log(obj, ' ', obj[key]);
        obj[key].map(o => {
          this.colors.map(c => {
            newArr.push({
              'name': `ROC to ${key} ${o} ${c}`,
              'value': `${key}_${o}_${c}`
            })
          })
        })
      }
    }
    console.log('FINAL :: ', newArr)
  }

  ngOnDestroy(): void {
    if (this.users$) this.users$.unsubscribe()
  }

}
