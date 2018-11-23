import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ImageUploadComponent } from './image-upload.component';

import { ImageUploadService } from './image-upload.service';
import { DropZoneDirective } from './drop-zone.directive';

import { AngularFireModule } from 'angularfire2'
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ImageCropperModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
  ],
  providers: [
    ImageUploadService
  ],
  exports: [
    ImageUploadComponent,
  ],
  declarations: [
    ImageUploadComponent,
    DropZoneDirective,
  ]
})
export class ImageUploadModule {}