import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable()

export class RentalService {
    private rentals: Rental[] = [
        {
            id: '1',
            title: 'Central Apartment',
            city: 'New York',
            street: 'Times Sqaure',
            category: 'apartment',
            image: 'http://via.placeholder.com/350x250',
            bedroom: 3,
            description: 'Very nice apartment',
            dailyRate: 34,
            shared: false,
            createAt: '24/12/2017'
        },
        {
            id: '2',
            title: 'Central Apartment 2',
            city: 'San Fancisco',
            street: 'Main street',
            category: 'condo',
            image: 'http://via.placeholder.com/350x250',
            bedroom: 2,
            description: 'Very nice apartment',
            dailyRate: 12,
            shared: true,
            createAt: '24/12/2017'
        },
        {
            id:'3',
            title: 'Central Apartment 3',
            city: 'Bratislava',
            street: 'Hlavna',
            category: 'condo',
            image: 'http://via.placeholder.com/350x250',
            bedroom: 3,
            description: 'Very nice apartment',
            dailyRate: 334,
            shared: true,
            createAt: '24/12/2017'
        },
        {
            id: '4',
            title: 'Central Apartment 4',
            city: 'Berlin',
            street: 'Haupt strasse',
            category: 'house',
            image: 'http://via.placeholder.com/350x250',
            bedroom: 9,
            description: 'Very nice apartment',
            dailyRate: 33,
            shared: true,
            createAt: '24/12/2017'
        },];

    public getRentalById(rentalId: string): Observable<Rental>{
        return new Observable<Rental>((obsever) =>{
            setTimeout(() => {
                const foundRental = this.rentals.find((rental) =>{
                    return rental.id == rentalId;
                });

                obsever.next(foundRental);
            }, 500);
        })
    }

    public getRentals(): Observable<Rental[]> {
       return new Observable<Rental[]>((observer) =>{
            setTimeout(() => {
                observer.next(this.rentals);
            }, 1000);
        });
    }
}