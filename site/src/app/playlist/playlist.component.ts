import { Component, OnInit } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.css"]
})
export class PlaylistComponent implements OnInit {
  currPlaylist: any[];
  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService
  ) {}
  changePlaylist() {}
  ngOnInit() {
    this.currPlaylist = this.localSt.retrieve("currPlaylist");
  }
  ngOnDestroy() {
    this.localSt.clear("currPlaylist");
  }
}
