import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  sortValue = '1'

  constructor(private activatedRoute: ActivatedRoute, public auth:  AuthService, private router: Router ) {
  }

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe((value) => this.auth.redirect = value.authOnly);
    this.activatedRoute.queryParams.subscribe((value) =>  this.sortValue = value.sort)

  }

  sort(event: Event){
    this.activatedRoute.queryParams.subscribe()
    const {value} =  event.target as HTMLSelectElement;
    this.router.navigate([], {queryParams: {
      sort: value
      }})
  }

}
