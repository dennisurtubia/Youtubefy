import { Component, OnInit } from "@angular/core";

import { LocalStorageService, SessionStorageService } from "ngx-webstorage";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  playlists: any[];
  player: YT.Player;
  items: any[];
  current: any[];
  page: number;
  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService
  ) {
    if (this.localSt.retrieve("page") === null) {
      this.localSt.store("page", "1");
      this.page = 1;
    } else {
      this.page = this.localSt.retrieve("page");
    }
    this.current = [
      {
        img:
          "http://www.punknet.com.br/wp-content/uploads/arctic-monkeys-am-300x300.jpg",
        title: "Speak to Me / Breathe",
        url: "http://youtube.com/whatch?",
        author: "Pink Floyd"
      }
    ];
    this.localSt.store("currPlaying", this.current);
    this.playlists = [
      {
        id: "1",
        img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
        name: "Teste 01",
        date: "01/01/2001",
        musicas: [
          {
            id: "1",
            title: "Teste",
            author: "Teste author",
            album: "Dark Side Of The Moon",
            url: "GJRdrcBCtdk",
            img:
              "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg"
          },
          {
            id: "2",
            title: "Teste",
            author: "Teste author",
            album: "Dark Side Of The Moon",
            url: "_FJBl6qjEzA",
            img:
              "http://www.punknet.com.br/wp-content/uploads/arctic-monkeys-am-300x300.jpg"
          }
        ]
      }
    ];
  }

  savePlayer(player) {
    this.player = player;
    console.log("player instance", player);
  }
  onStateChange(event) {
    console.log("player state", event.data);
  }
  changePage(pageNumber: number) {
    this.page = pageNumber;
  }

  ngOnInit() {}
}
