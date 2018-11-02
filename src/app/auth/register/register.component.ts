import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {username: 'Louis'};
  errors: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register() {
    console.log(this.formData);
  }

}
