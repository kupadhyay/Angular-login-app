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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  encryptSecretKey: string = "ABCD9823@#&87FGWER!";
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpService: RestApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }
  registerForm = this.formBuilder.group(
    {
      username: ["", [Validators.required]],
      password: [
        "",
        Validators.compose([Validators.required]),
      ],
      confPassword: ["", Validators.required],
    },
    {
      validator: this.MatchPassword("password", "confPassword"),
    }
  );

  MatchPassword(password: string, confirmPassword: string) {
    return (registerForm) => {
      const passwordControl = registerForm.controls[password];
      const confirmPasswordControl = registerForm.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  submit() {
    const encryptPwd = CryptoJS.AES.encrypt(
      JSON.stringify(this.registerForm.value.password),
      this.encryptSecretKey
    ).toString();
    this.username = this.registerForm.value.username;
    this.password = encryptPwd;
    this.httpService.post({username: this.username, password: this.password}).subscribe(
      (data) =>{
        console.log("get operation data1", data);
        this.toastr.success("User registered successfully...");
        this.router.navigate(["login"]);
      }
    )
    // this.httpService.getRequest().subscribe((data)=> {
    //     console.log("get operation data", data);
    //   }
    // )

  }
  onCancel() {
  //  this.data.sendMessageToLogin(this.registerForm.controls["username"].value);
    this.router.navigate(["login"]);
  }
}
