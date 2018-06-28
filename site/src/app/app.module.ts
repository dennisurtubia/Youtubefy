import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { PublisherComponent } from "./publisher/publisher.component";
import { AdminComponent } from "./admin/admin.component";
import { PlayerComponent } from "./player/player.component";
import { PlaylistComponent } from "./playlist/playlist.component";
import { AlbumComponent } from "./album/album.component";
import { CardMusicComponent } from "./card-music/card-music.component";
import { MyMusicComponent } from "./my-music/my-music.component";
import { GlobalsComponent } from "./globals/globals.component";
import { Ng2Webstorage } from "ngx-webstorage";
import { YoutubePlayerModule } from "ngx-youtube-player";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { MinuteSecondsPipe } from './minute.pipe';

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "publicadora", component: PublisherComponent },
  { path: "admin", component: AdminComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "**", component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PageNotFoundComponent,
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PublisherComponent,
    AdminComponent,
    PlayerComponent,
    PlaylistComponent,
    AlbumComponent,
    CardMusicComponent,
    MyMusicComponent,
    GlobalsComponent,
    MinuteSecondsPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    Ng2Webstorage,
    YoutubePlayerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    YoutubePlayerModule,
    PlayerComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
