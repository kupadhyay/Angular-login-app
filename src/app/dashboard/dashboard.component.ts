import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string;
  constructor(private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username'); 
  }
  onLogout() {
    this.toastr.success("Logout successful...");
    this.router.navigate(["login"]);
  }

}
