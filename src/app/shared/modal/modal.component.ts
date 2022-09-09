import {AfterContentInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterContentInit {
  @Input()modalId = '';

  constructor(private el: ElementRef, public modalService : ModalService ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    document.body.appendChild(this.el.nativeElement)
  }




}
