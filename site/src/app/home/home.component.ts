import { Component, OnInit } from "@angular/core";

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
  constructor() {
    this.current = [
      {
        img:
          "http://www.punknet.com.br/wp-content/uploads/arctic-monkeys-am-300x300.jpg",
        title: "Speak to Me / Breathe",
        author: "Pink Floyd"
      }
    ];
    this.playlists = [
      {
        name: "Teste 01",
        date: "01/01/2001"
      },
      {
        name: "Teste 02",
        date: "01/01/2001"
      },
      {
        name: "Teste 03",
        date: "01/01/2001"
      },
      {
        name: "Teste 04",
        date: "01/01/2001"
      },
      {
        name: "Teste 05",
        date: "01/01/2001"
      },
      {
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
  changePage(pageNumber) {
    this.page = pageNumber;
  }
  ngOnInit() {}
}
