import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Rental } from '../../shared/rental.model';
import { AuthService } from '../../../auth/shared/auth.service';
import { Booking } from '../../../booking/shared/booking.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss'],  
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;
  
  newBooking: Booking;
  modalRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  options: any = {
    locate: { format: Booking.DATE_FORMAT},
    alwaysShowCalendars: false,
    opens: 'left',
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDates(this)
  };

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.newBooking = new Booking();
  }

  private checkForInvalidDates(data){
    return true;
  }

  selectedDate(value: any, datepicker?: any){
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = value.start;
    this.newBooking.endAt = value.end;
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }
}
 