import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Meetup } from '../models/meetup.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  constructor(public afs: AngularFirestore) { }



  /** Gets all chirps in the system */
  public getAllMeetups(): Observable<Meetup[]> {
    return this.afs
      .collection('meetups', ref => ref.orderBy('time', 'desc'))
      .valueChanges().pipe(
        map( meetups => meetups.map( meetupObj => new Meetup(meetupObj) ))
      );
  }

  public getPosts = async () => {
    const posts = [];
    let snapShot = await this.afs.collection(`meetups`).get(); // rest of the code will wait for the snapShot value.
    snapShot.forEach((doc) => {
      console.log("Document:: ")
      console.log(doc);
            let data = {doc};
            posts.unshift(data);
        });
    console.log(posts);
    console.log(posts.length);
    console.log(posts[1]);  // Will print the object.
    return posts;
};


  /**
   * Posts a new meetup to the database
   * @param meetup The meetup object we want to save
   */
  public postMeetup(meetup: Meetup): void {
    this.afs.collection('meetups').add({ // Break down the meetup to a JS object to save
      user:  meetup.user,
      time: meetup.time,
      text: meetup.text,
      realTime: meetup.realTime,
      park: meetup.park
    });
  }

  public printAllMeetups(): void{
    console.log("Attempting to print all meetups......")
    this.afs.collection('employees')
    .valueChanges()
    .subscribe(docs => {
      // loop through each item in the array and log value
      docs.forEach(doc => console.log(doc));
    });
  }
}
