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

const routes : Routes = [
    { path: 'rentals', component: RentalComponent, children: [
        { path: '', component: RentalListComponent },
        { path: ':rentalId', component: RentalDetailComponent }
    ]},
  ];

@NgModule({
    declarations: [
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        UppercasePipe
    ],
    imports : [
        CommonModule,
        HttpClientModule,
        NgPipesModule,
        RouterModule.forChild(routes), 
    ],
    providers: [RentalService]
})
export class RentalModule{

}