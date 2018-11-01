import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_k2Q0AccyhZED2eZGypVUJbbEwiUtsFI'
    }),

    CommonModule
  ],
  exports: [
    MapComponent
  ],
  providers: [
    MapService,
    CamelizePipe
  ]
})
export class MapModule { }
