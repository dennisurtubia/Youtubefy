import { Component, OnInit } from "@angular/core";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  constructor(
    private localSt: LocalStorageService,
    private sessionSt: SessionStorageService
  ) {}

  setPage(page: number) {
    this.localSt.store("page", page);
  }

  ngOnInit() {}
}
