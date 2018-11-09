import { Injectable } from "@angular/core";
import { RentalService } from "./rental.service";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class RentalGuard implements CanActivate {
    constructor(private rentalService: RentalService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const rentalId: string = route.params.rentalId;

        return this.rentalService.verifyRentalUser(rentalId).pipe(map(() => {
            return true;
        }), catchError(() => {
            this.router.navigate(['/rentals']);
            return Observable.of(false);
        }))
    }
}