import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { marker } from 'leaflet';
import { FormsModule, NgForm } from '@angular/forms';
import { MeetupService } from '../services/meetup.service';
import { Meetup } from '../models/meetup.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  @Input() meetupList: Observable<Meetup[]>;

  private map;
  public disableForm : boolean = false;

  public userName: string;
  public textName: string;
  public timeName: string;
  public parkName: string;
  public realTimeName: string;

  public posts = this.meetupService.getPosts();

  private blueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowSize:   [50, 64],
    iconAnchor:   [12, 41],
    popupAnchor:  [1, -35]
});

  private greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowSize:   [50, 64],
    iconAnchor:   [12, 41],
    popupAnchor:  [1, -35]
});

private purpleIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowSize:   [50, 64],
  iconAnchor:   [12, 41],
  popupAnchor:  [1, -35]
});

  private currentParkIndex = 0;
  public selectedPark = null;
  public markers = [
    {
        name: "Roger Scott Dog Park",
        lat: 30.466467,
        lon: -87.198278,
        coords: [30.466467, -87.198278]
    },
    {
        name: "Bayview Dog Beach",
        lat: 30.431127,
        lon: -87.191181,
        coords: [30.431127, -87.191181]
    },
    {
        name: "Bill Dickson Dog Park",
        lat: 30.359872,
        lon: -87.336452,
        coords: [30.359872, -87.336452]
    },
    {
        name: "River Road Dog Park",
        lat: 30.300473,
        lon: -87.44216,
        coords: [30.300473, -87.44216]
    },
    {
        name: "Beulah Regional Park",
        lat: 30.516291,
        lon: -87.373174,
        coords: [30.516291, -87.373174]
    },
    {
        name: "Pensacola Dog Beach",
        lat: 30.344983,
        lon: -87.068812,
        coords: [30.344983, -87.068812]
    },

]


public showButtons = false;

  private initMap(): void {
    
    this.map = L.map('mapID').setView([30.42, -87.21], 10);

  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

//Adding markers to map
for(let i = 0; i < this.markers.length; i++){
  L.marker([this.markers[i].lat, this.markers[i].lon], {icon: this.blueIcon}).bindPopup(this.markers[i].name).addTo(this.map);
}

  tiles.addTo(this.map);
}

clickNext(){
          if(this.currentParkIndex == this.markers.length-1) {
            this.currentParkIndex = 0;
            this.map.flyTo(this.markers[this.currentParkIndex].coords, 18);
         } else  {
            this.currentParkIndex +=1;
            this.map.flyTo(this.markers[this.currentParkIndex].coords, 18);
        }
}

clickPrev(){
        if(this.currentParkIndex == 0) {
            this.currentParkIndex = this.markers.length-1;
            this.map.flyTo(this.markers[this.currentParkIndex].coords, 18)
        } else {
            this.currentParkIndex -=1;
            this.map.flyTo(this.markers[this.currentParkIndex].coords, 18);
        }
}

//Create and send a new Meetup to the firestore collection
clickSubmit(userName, textName, dateName, realTimeName, parkName){
  console.log(userName, textName, dateName);
 this.meetupService.postMeetup(new Meetup({
    user: userName,
    text: textName,
    time: dateName,
    realTime: realTimeName,
    park: parkName
  })
);
  this.disableForm = true;
}

formIsInvalid(){
  if(this.disableForm){
  return true;
  }else{
    return false;
  }
}

clickVisited(){
  L.marker(this.selectedPark.coords, {icon: this.greenIcon}).bindPopup(this.selectedPark.name).addTo(this.map);
}

clickPlanToVisit(){
  L.marker(this.selectedPark.coords, {icon: this.purpleIcon}).bindPopup(this.selectedPark.name).addTo(this.map);
}

selectorChange(){
  this.showButtons = true;
  this.map.flyTo(this.selectedPark.coords, 18);
}

  constructor(private meetupService: MeetupService, private db: AngularFirestore) { }
  
  ngAfterViewInit(): void {
    this.initMap();

    console.log("Video Method: ");

    this.db.collection('meetups').valueChanges().subscribe(
      val => console.log(val));



    console.log(this.posts);
    this.meetupList = this.meetupService.getAllMeetups();
    console.log("Print All Method: ");
    this.meetupService.printAllMeetups();
    console.log("Get All Method: ");
    console.log(this.meetupList);
    console.log("Attempted to print meetups");

  }

}

