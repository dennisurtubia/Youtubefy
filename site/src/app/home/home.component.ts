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

    this.playlists = [
      {
        id: "1",
        img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
        name: "Teste 01",
        date: "01/01/2001",
        musics: [{
          id: "1",
          img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
          title: "Another Brick In The Wall",
          author: "Pink Floyd",
          album: "Dark Side of The Moon",
          url: "https://pegasus-g4.sscdn.co/palcomp3/7/7/4/4/kevinho-pa-pum-dj-rd-37b2037c.mp3"
        },
        {
          id: "2",
          img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
          title: "Speak to Me / Breathe",
          author: "Pink Floyd",
          album: "Dark Side of The Moon",
          url: "https://griphon-g2.sscdn.co/palcomp3/c/a/b/0/kevinho-mc-dede-e-pega-a-receita-dj-rd-dfaafe35.mp3"
        },
        {
          id: "3",
          img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
          title: "Speak to Me / Breathe",
          author: "Pink Floyd",
          album: "Dark Side of The Moon",
          url: "https://phoenix-g4.sscdn.co/palcomp3/6/9/5/8/mckevinho-rabiola-3b4f065f.mp3"
        },
        {
          id: "1",
          img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
          title: "Speak to Me / Breathe",
          author: "Pink Floyd",
          album: "Dark Side of The Moon",
          url: "https://youtube.com/teste"
        },
        {
          id: "1",
          img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
          title: "Speak to Me / Breathe",
          author: "Pink Floyd",
          album: "Dark Side of The Moon",
          url: "https://youtube.com/teste"
        },
        {
          id: "1",
          img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
          title: "Speak to Me / Breathe",
          author: "Pink Floyd",
          album: "Dark Side of The Moon",
          url: "https://youtube.com/teste"
        },
        {
          id: "1",
          img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
          title: "Speak to Me / Breathe",
          author: "Pink Floyd",
          album: "Dark Side of The Moon",
          url: "https://youtube.com/teste"
        },
        {
          id: "1",
          img:
          "https://lh5.googleusercontent.com/-444l_KCN5iA/TXFDWWJyuwI/AAAAAAAABNY/PLNJLdqMyg4/s320/Pink_Floyd_-_Dark_Side_of_the_Moon.jpg",
          title: "Speak to Me / Breathe",
          author: "Pink Floyd",
          album: "Dark Side of The Moon",
          url: "https://youtube.com/teste"
        }
      ]
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
