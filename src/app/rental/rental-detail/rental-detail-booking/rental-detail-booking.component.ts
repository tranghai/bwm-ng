import { Component, Input, OnInit, ViewChild, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from '../../../auth/shared/auth.service';
import { Booking } from '../../../booking/shared/booking.model';
import { BookingService } from '../../../booking/shared/booking.service';
import { HelperService } from '../../../common/service/helper.service';
import { Rental } from '../../shared/rental.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss'],  
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent) private picker: DaterangePickerComponent;

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
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(public auth: AuthService, 
              private helper : HelperService,
              private bookingService: BookingService,
              private modalService: NgbModal, 
              private toastr: ToastsManager, 
              private vcr: ViewContainerRef
              ) { 
                this.toastr.setRootViewContainerRef(vcr);
              }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }


  private checkForInvalidDates(date){
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date) || date.diff(moment(), 'days') < 0);
  }

  private resetDatePicker(){
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  private getBookedOutDates(){
    const bookings: Booking[] = this.rental.bookings;

    if(bookings && bookings.length > 0){
      bookings.forEach((booking: Booking)=>{
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  // Để add book days
  private addNewBookedDates(bookingData: any){
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  openConfirmModal(content){
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  createBooking(){
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe((bookingData) =>{
      this.addNewBookedDates(bookingData);
      this.newBooking = new Booking();
      this.modalRef.close();
      this.resetDatePicker();
      this.toastr.success('Booking has been successfuly created, check your booking detail in mange section', 'Success!')
    }, (errorResponse) =>{
      this.errors = errorResponse.error.errors;
    });
  }

  selectedDate(value: any, datepicker?: any){
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }
}
 