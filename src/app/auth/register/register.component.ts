import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors: any[] = [];

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.formData).subscribe(()=>{
      this.router.navigate(['/login', { registered: 'success'}]);
    }, (errorResponse) =>{
      this.errors = errorResponse.error.errors;
    });
  }

}
