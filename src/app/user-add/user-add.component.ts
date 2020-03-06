import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  angForm: FormGroup;

  constructor(private fb: FormBuilder, private us: UserService) {
    this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      firstname: ['', Validators.required ],
      username: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  addUser(firstname, username, email, password) {
    this.us.addUser(firstname, username, email, password);
  }

  ngOnInit(): void {
  }

}
