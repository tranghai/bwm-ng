import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { ToastsManager } from 'ng2-toastr';
import { UcWordsPipe } from 'ngx-pipes';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {

  rental: Rental;
  rentalCategories: string[] = Rental.CARTEGORIES;
  locationSubject: Subject<any> = new Subject();
  constructor(private router: ActivatedRoute,
    private rentalService: RentalService,
    private toast: ToastsManager,
    private upperPipe: UcWordsPipe,
    private vcr: ViewContainerRef) {
    
    this.transformLocation = this.transformLocation.bind(this);
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.getRental(params['rentalId']);
    });
  }

  transformLocation(location: string): string {
    return this.upperPipe.transform(location);
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe((rental: Rental) => {
      this.rental = rental;
    });
  }

  updateRental(rentalId: string, rentalData: any){
    this.rentalService.updateRental(rentalId, rentalData).subscribe((updatedRental: Rental)=>{
      this.rental = updatedRental;

      if(rentalData.city || rentalData.street){
        this.locationSubject.next(this.rental.city + ', ' + this.rental.street);
      }
    }, (errorResponse: HttpErrorResponse) =>{
      this.toast.error(errorResponse.error.errors[0].detail, 'Error');
      this.getRental(rentalId);
    });
  }

  countBedroomAssets(assetsNum: number){
    return parseInt(<any>this.rental.bedrooms || 0, 10) + assetsNum;
  }
}
