import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users;
  passwords: Array<any> = [];
  message: string;
  errorMessage: string = "";
  encryptSecretKey: string = "ABCD9823@#&87FGWER!";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: RestApiService
  ) { }

  ngOnInit() {
    this.httpService.get().subscribe( 
      (data) => {
        console.log('user list -----',data);
        this.users = data;
      }
    )
  }

  form = this.formBuilder.group({
    username: ["", [Validators.required]],
    password: ["", Validators.required],
  });

  usernameValidator() {
    return { userExist: true };
  }

  onRegister() {
   // this.data.sendMessageToRegister(this.form.controls["username"].value);
    this.router.navigate(["register"]);
  }

  submit() {
    debugger;
    // this.errorMessage = "";
    var self = this;
    var userExist = this.users.find( function( ele ) { 
        return ele.username === self.form.value.username;
      } );
    if (userExist) {
      // user exists in db.json
      let dbpassword = userExist.password;

      const bytes = CryptoJS.AES.decrypt(
        dbpassword,
        this.encryptSecretKey
      );
      if (bytes.toString()) {
        dbpassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }

      if(dbpassword == this.form.value.password) {
        // password match and redirect to dashboard
        this.router.navigate(["dashboard"]);
      }
    }
    else {
      // no user found...
    }
  }

}
