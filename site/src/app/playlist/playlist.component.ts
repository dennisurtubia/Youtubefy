import { Component, OnInit } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";

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
  changePlaylist() {}
  ngOnInit() {
    this.currPlaylist = this.localSt.retrieve("currPlaylist");
  }

  ngOnDestroy() {
    this.localSt.clear("currPlaylist");
  }
}
