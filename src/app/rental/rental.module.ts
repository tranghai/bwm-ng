import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { MapModule} from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';

// Rental
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

// Service
import { RentalService } from './shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { HelperService } from '../common/service/helper.service';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';

// Guard
import { AuthGuard } from '../auth/shared/auth.guard';


const routes : Routes = [
    { path: 'rentals', component: RentalComponent, children: [
        { path: '', component: RentalListComponent },
        { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] }
    ]},
  ];

@NgModule({
    declarations: [
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        UppercasePipe,
        RentalDetailBookingComponent
    ],
    imports : [
        RouterModule.forChild(routes), 
        CommonModule,
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker,
        FormsModule
    ],
    providers: [
        RentalService,
        BookingService,
        HelperService
    ]
})
export class RentalModule{

}