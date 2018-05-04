import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../shared/services/details.service';
import {UserInterface} from '../directory/User';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import * as $ from 'jquery';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  users: UserInterface[];
  newForm: FormGroup;
  name: FormControl;
  address: FormControl;
  contact: FormControl;
  email: FormControl;

  initUpdate: UserInterface;

  updateForm: FormGroup;
  updateName: FormControl;
  updateAddress: FormControl;
  updateContact: FormControl;
  updateEmail: FormControl;


  constructor(private detailServ: DetailsService) {
      this.detailServ.getUsers()
                    .subscribe(users => {
                      this.users = users;
                    });
      this.initUpdate = {
          'name': '',
          'address': '',
          'contact': 0,
          'email': ''
        };
  }

  ngOnInit() {
    $(document).ready(function() {
        console.log('loaded jQuery');
      });
    this.createFormControls();
    this.createForm();
    this.createUpdateFormControls();
    this.createUpdateForm();
  }

  // Form methods
  createFormControls() {
    this.name = new FormControl('', [
      Validators.required
    ]);

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);

    this.contact = new FormControl('', [
      Validators.required
    ]);

    this.address = new FormControl('', [
      Validators.required
    ]);
  }

  createForm() {
    this.newForm = new FormGroup({
      email: this.email,
      name: this.name,
      contact: this.contact,
      address: this.address
    });
  }

  createUpdateFormControls() {
    this.updateName = new FormControl(this.initUpdate.name, [
      Validators.required
    ]);

    this.updateEmail = new FormControl(this.initUpdate.email, [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);

    this.updateContact = new FormControl(this.initUpdate.contact, [
      Validators.required
    ]);

    this.updateAddress = new FormControl(this.initUpdate.address, [
      Validators.required
    ]);
  }

  createUpdateForm() {
    this.updateForm = new FormGroup({
      updateEmail: this.updateEmail,
      updateName: this.updateName,
      updateContact: this.updateContact,
      updateAddress: this.updateAddress
    });
  }

  updateFormControls(currentUser) {
    // tslint:disable-next-line:forin
    for (const key in currentUser) {
        this.initUpdate[key] = currentUser[key];
    }
  }

  // CRUD methods
  getAllUsers() {
    this.detailServ.getUsers()
    .subscribe(users => {
      this.users = users;
    });
  }

  addUser(item) {
    this.detailServ.addUser(item)
              .subscribe(res => {
                console.log(res);
                this.getAllUsers();
                this.newForm.reset();
              });
  }

  deleteUser(userID) {
    this.detailServ.deleteUser(userID)
              .subscribe(res => {
                console.log(res);
                this.getAllUsers();
              });
  }

  updateUser(user, id) {
    const userToUpdate = {
      name: user.updateName,
      email: user.updateEmail,
      contact: user.updateContact,
      address: user.updateAddress,
      id: id
    };

    this.detailServ.updateUser(userToUpdate)
    .subscribe(res => {
      console.log(res);
      this.getAllUsers();
    });
  }

}
