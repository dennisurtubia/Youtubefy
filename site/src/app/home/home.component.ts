import { Component, OnInit } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  playlists: any[];
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
        name: "Teste 01",
        date: "01/01/2001"
      },
      {
        id: "2",
        name: "Teste 02",
        date: "01/01/2001"
      },
      {
        id: "3",
        name: "Teste 0444",
        date: "01/01/2001"
      },
      {
        id: "4",
        name: "Teste 04",
        date: "01/01/2001"
      },
      {
        id: "5",
        name: "Teste 05",
        date: "01/01/2001"
      },
      {
        id: "6",
        name: "Teste 06",
        date: "01/01/2001"
      }
    ];
    this.items = [
      {
        img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
        title: "Speak to Me / Breathe",
        author: "Pink Floyd"
      },
      {
        img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
        title: "On The Run",
        author: "Pink Floyd"
      },
      {
        img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
        title: "Time",
        author: "Pink Floyd"
      },
      {
        img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
        title: "The Great Gig in the Sky",
        author: "Pink Floyd"
      },
      {
        img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
        title: "Money",
        author: "Pink Floyd"
      },
      {
        img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
        title: "Us and Them",
        author: "Pink Floyd"
      },
      {
        img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
        title: "Any Colour You Like",
        author: "Pink Floyd"
      },
      {
        img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
        title: "Brain Damage",
        author: "Pink Floyd"
      },
      {
        img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
        title: "Eclipse",
        author: "Pink Floyd"
      }
    ];
  }
  changePage(pageNumber: number) {
    this.page = pageNumber;
  }

  ngOnInit() {}
}
