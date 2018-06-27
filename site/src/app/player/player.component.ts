import { Component, OnInit, Input, Output} from '@angular/core';
import { GetApiService } from "../get-api.service";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  musica: string;
  player: YT.Player;
  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService,
    private getApi: GetApiService,
  ) { }
  savePlayer(player) {
    this.player = player;
    console.log("player instance", player);
  }
  onStateChange(event) {
    console.log("player state", event.data);
  }

  ngOnInit() {
    
  }
  @Input("music") music: string;
}
