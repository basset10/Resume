import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-dog-park';

  constructor(){ }

  /**I just commented everything instead of deleting just too make sure it all works first */
  /*
  embeddedVideo: SafeHtml;
  public showVideo: boolean = false;
  constructor(private sanitizer: DomSanitizer){ }

  
  EmbedVideo() {
    console.log("Bird Button was pressed");

    
    if(this.showVideo){
    this.embeddedVideo = this.sanitizer.bypassSecurityTrustHtml( `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@barrowc97/video/6934139265030851845" data-video-id="6934139265030851845" style="max-width: 605px;min-width: 325px;" >
                                <section> <a target="_blank" title="@barrowc97" href="https://www.tiktok.com/@barrowc97">@barrowc97</a>
                                    <p>
                                        <a title="rip" target="_blank" href="https://www.tiktok.com/tag/rip">##rip</a>
                                        <a title="mygirl" target="_blank" href="https://www.tiktok.com/tag/mygirl">##mygirl</a> <a title="birddog" target="_blank" href="https://www.tiktok.com/tag/birddog">##birddog</a> <a title="cancersucks" target="_blank" href="https://www.tiktok.com/tag/cancersucks">##cancersucks</a>
                                    </p>
                                    <a target="_blank" title="♬ Home - Edith Whiskers" href="https://www.tiktok.com/music/Home-6773436955838401285" aria-label="link to Home song">♬ Home - Edith Whiskers</a>
                                </section>
                            </blockquote>`);
    }else{
      this.embeddedVideo = this.sanitizer.bypassSecurityTrustHtml( ``);
    }
  }

  ShowVideo() {
    console.log("button clicked")
    if(!this.showVideo){
      this.showVideo = true;
    } else {
      this.showVideo = false;
    }
    return this.showVideo;
  
  }
  */

}
