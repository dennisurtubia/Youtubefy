import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card-music",
  templateUrl: "./card-music.component.html",
  styleUrls: ["./card-music.component.css"]
})
export class CardMusicComponent {
  @Input("img") img: string;
  @Input("author") author: string;
  @Input("title") title: string;
}
