export class Meetup {

    public user: string;
    public text: string;
    public time: string;
    public realTime: string;
    public park: string;

    constructor(meetupObj) {
        this.user = meetupObj.user;
        this.text = meetupObj.text;
        this.time = meetupObj.time;
        this.realTime = meetupObj.realTime;
        this.park = meetupObj.park;
    }
}
