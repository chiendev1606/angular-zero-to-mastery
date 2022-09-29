import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  isDragOver = false;
  file: null | File = null;
  nextStep = false;

  title = new FormControl('', {
    validators: [
      Validators.required, Validators.min(3)
    ], nonNullable: true
  });

  UploadForm = new FormGroup({
    title: this.title
  })

  constructor() { }

  ngOnInit(): void {
  }

  storeFile(e: Event){
    this.isDragOver = false;
   this.file = (e as DragEvent).dataTransfer?.files.item(0) ?? null;
   if(!this.file || this.file.type !== 'video/mp4'){
     return;
   }

   this.nextStep = true;
   this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ""));
  }

  uploadFile(){
    console.log('file uploaded')
  }

}
