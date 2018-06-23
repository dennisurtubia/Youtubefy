import { Component, Input } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import {HomeComponent} from "../home/home.component";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent {
  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService,
    private home: HomeComponent
  ) {}
  changePage(pageNumber: number) {
    this.localSt.store("page", pageNumber);
  }
  currPlaylist(playlist: any[]) {
    this.localSt.store("page", 3);
    this.localSt.store("currplaylist", playlist);
  }
  @Input("current") current: any[];
  @Input("playlists") playlists: any[];
}
