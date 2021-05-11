import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public route: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    //this.GetRoute();
  }

  GetRoute() {
    this.route = this.router.url;
    console.log(this.route); 
  }

}
