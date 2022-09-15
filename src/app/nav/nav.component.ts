import {Component, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {AuthService} from "../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public modalService: ModalService, public auth: AuthService, public afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
  }

  openModal(evt: MouseEvent) {
    evt.preventDefault();
    this.modalService.toggleModal('auth')
  }

  logout($evt: Event) {
    $evt.preventDefault();
    this.afAuth.signOut()
  }

}
