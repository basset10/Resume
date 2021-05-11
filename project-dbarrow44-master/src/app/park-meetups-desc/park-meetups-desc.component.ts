import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-park-meetups-desc',
  templateUrl: './park-meetups-desc.component.html',
  styleUrls: ['./park-meetups-desc.component.css']
})
export class ParkMeetupsDescComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //scrolls to top
    window.scrollTo(0,0);
  }

}
