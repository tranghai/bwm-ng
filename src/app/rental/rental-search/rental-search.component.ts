import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {

  city: string;
  rentals: Rental[] = [];
  errors : any[] = [];

  constructor(private router: ActivatedRoute,
              private rentalService: RentalService) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.city = params['city'];
      this.getRentals();
    });
  }

  getRentals(){
    this.errors = [];
    this.rentals = [];

    this.rentalService.getRentalsByCity(this.city).subscribe((rentals: Rental[]) =>{
      this.rentals = rentals;
    }, (errorResponse : HttpErrorResponse) =>{
      this.errors = errorResponse.error.errors;
    });
  }

}
