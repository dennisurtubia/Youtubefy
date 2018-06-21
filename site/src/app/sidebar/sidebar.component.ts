import { Component, Input } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent {
  @Input("current") current: any[];
  @Input("playlists") playlists: any[];
}
