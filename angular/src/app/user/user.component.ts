import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  types$: any;
  hobbies$: any;
  hobbyData = []
  typeData = [];
  selectedHobbies = []
  formData = new FormData();
  picker: any;
  datePicker: any;
  maxDate = new Date();
  editId: any;
  editData: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(p => {
      if (p && p.id) this.editId = p.id;
    })
  }

  ngOnInit(): void {
    // if ()
    if (this.editId) {
      this.userService.getUserById(this.editId).subscribe((res: any) => {
        if (res && res.data) this.editData = res.data;
        this.initForm(this.editData);
      }, err => {
        console.log(err)
      })
    } else {
      this.initForm();
    }

    this.getHobbies()
    this.getTypes()
  }

  initForm(data?) {
    console.log(data)
    this.userForm = this.formBuilder.group({
      firstName: [data?.firstName, Validators.required],
      lastName: [data?.lastName, Validators.required],
      email: [data?.email, [Validators.required, Validators.email]],
      profile: [data?.profile],
      hobbies: [data?.hobbies?.map(h => h._id)],
      type: [data?.type?._id, [Validators.required]],
      dob: [data?.dob]
    });
  }

  getHobbies() {
    this.hobbies$ = this.userService.getHobby().subscribe((res: any) => {
      if (res && res.data) this.hobbyData = [...res.data]
    }, err => {
      console.log('Error :: ', err)
    })
  }

  getTypes() {
    this.types$ = this.userService.getType().subscribe((res: any) => {
      if (res && res.data) this.typeData = [...res.data]
    }, err => {
      console.log('Error :: ', err)
    })
  }

  get f() { return this.userForm.controls; }

  onFileSelect(e) {
    let file = e.target.files[0]
    this.formData.append('profile', file)
  }

  onSubmit() {
    // console.log('SUBD :: ', this.userForm)
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    let dataObj = this.userForm.value;
    for (const key in dataObj) {
      if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
        const element = dataObj[key];
        if (key == 'hobbies') {
          for (var i = 0; i < dataObj['hobbies'].length; i++) {
            this.formData.append('hobbies[]', dataObj['hobbies'][i])
          }
        }
        else this.formData.append(key, element)
      }
    }

    let addData;
    if (this.editId) {
      addData = this.userService.updateUser(this.formData, this.editId);
    } else {
      addData = this.userService.addUser(this.formData);
    }
    addData.subscribe(res => {
      alert(res['message'])
      this.submitted = false;
      this.userForm.reset()
      this.router.navigate(['list'])
    }, err => {
      console.log(err)
    })
  }


  ngOnDestroy(): void {
    if (this.types$) this.types$.unsubscribe()
    if (this.hobbies$) this.hobbies$.unsubscribe()
  }

}
