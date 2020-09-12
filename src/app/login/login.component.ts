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
import { ToastrService } from 'ngx-toastr';

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
    private httpService: RestApiService,
    private toastr: ToastrService
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

      debugger;
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
        this.toastr.success("Login successful...");
        localStorage.setItem('username', this.form.value.username);
        this.router.navigate(["dashboard"]);
      }
      else{
        //Note: can generate notification service with status and dynamic message...
        this.toastr.error("Password is wrong...");
      }
    }
    else {
      // no user found...
      this.toastr.error("Username is not exist...");
    }
  }

}
