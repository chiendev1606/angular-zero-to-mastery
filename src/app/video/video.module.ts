import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { ClipComponent } from './clip/clip.component';
import {AppBlockEventDirective} from "../directives/app-block-event.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";




@NgModule({
  declarations: [
    ManageComponent,
    UploadComponent,
    ClipComponent,
    AppBlockEventDirective
  ],
  imports: [
    CommonModule,
    VideoRoutingModule, ReactiveFormsModule, SharedModule
  ]
})
export class VideoModule { }
