import { Component, OnInit } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { componentRefresh } from "@angular/core/src/render3/instructions";
import { ngAudio}

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.css"]
})
export class PlaylistComponent implements OnInit {
  currPlaylist: any[];
  image: string;
  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService
  ) {
    this.image =
      "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg";
  }

  
  setCurrent(music:any[]){
    this.localSt.store("currPlaying", music);
  }
  changePlaylist() {}
  ngOnInit() {
    this.currPlaylist = this.localSt.retrieve("currPlaylist");
  }

  ngOnDestroy() {
    this.localSt.clear("currPlaylist");
  }
}
