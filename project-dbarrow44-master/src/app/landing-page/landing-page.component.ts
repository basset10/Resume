import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public showVideo: boolean = false;

  constructor() { }

  ngOnInit(): void {
    //Scrolls to top 
    window.scrollTo(0,0);
  }

  ShowVideo() {
    console.log("button clicked")
    if(!this.showVideo){
      this.showVideo = true;
    } else {
      this.showVideo = false;
    }
  }

}
