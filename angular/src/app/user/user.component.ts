import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../user.service";
import { Router } from "@angular/router";


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
  formData = new FormData()

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profile: [''],
      hobbies: [[]],
      type: ['', [Validators.required]],
      dob: ['']
    });

    this.getHobbies()
    this.getTypes()
  }

  getHobbies() {
    this.hobbies$ = this.userService.getHobby().subscribe((res: any) => {
      if (res && res.length > 0) this.hobbyData = [...res]
      console.log('Data :: ', this.hobbyData)
    }, err => {
      console.log('Error :: ', err)
    })
  }

  getTypes() {
    this.types$ = this.userService.getType().subscribe((res: any) => {
      if (res && res.length > 0) this.typeData = [...res]
      console.log('Data :: ', this.typeData)
    }, err => {
      console.log('Error :: ', err)
    })
  }

  get f() { return this.userForm.controls; }

  onFileSelect(e) {
    let file = e.target.files[0]
    console.log('File :: ', file)
    this.formData.append('profile', file)
  }

  getType(e) {
    this.f.type.patchValue(e.target.value)
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.userForm.value)
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    let dataObj = this.userForm.value;
    for (const key in dataObj) {
      if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
        const element = dataObj[key];
        console.log(key, ' ', element)
        if (key == 'hobbies') {
          this.formData.append('hobbies[]', dataObj['hobbies'])
        } else {
          this.formData.append(key, element)
        }

      }
    }
    this.userService.addUser(this.formData).subscribe(res => {
      console.log('RES ', res)
      alert('Success')
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
