import { NgModule } from '@angular/core';
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { CommonModule } from '@angular/common';
import { RentalService } from './shared/rental.service';
import { RouterModule, Routes } from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';
import { MapModule} from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { FormsModule } from '@angular/forms';

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
    providers: [RentalService]
})
export class RentalModule{

}