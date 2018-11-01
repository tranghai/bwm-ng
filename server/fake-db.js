const Rental = require('./models/rental');

class FakeDb {
    constructor() {
        this.rentals = [
            {
                // id: '2',
                title: 'Nice view on ocean',
                city: 'San Fancisco',
                street: 'Main street',
                category: 'condo',
                image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
                bedrooms: 5,
                description: 'Very nice apartment in center of the city',
                dailyRate: 43,
                shared: true,
                //createAt: '24/12/2017'
            },
            {
                //id:'3',
                title: 'Modern apartment in center',
                city: 'New York',
                street: 'Time Square',
                category: 'house',
                image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
                bedrooms: 1,
                description: 'Very nice apartment in center of the city',
                dailyRate: 11,
                shared: true,
                //createAt: '24/12/2017'
            },
            {
                //id: '4',
                title: 'Old house in nature',
                city: 'Berlin',
                street: 'Haupt strasse',
                category: 'apartment',
                image: 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
                bedrooms: 5,
                description: 'Very nice apartment in center of the city',
                dailyRate: 23,
                shared: false,
                //createAt: '24/12/2017'
            }];
    }

   async cleanDb(){
        await Rental.remove({});
    }

    pushRentalsToDb() {
        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.save();
        });
    }

    seedDb(){
        this.cleanDb();
        this.pushRentalsToDb();
    }
}

module.exports = FakeDb;