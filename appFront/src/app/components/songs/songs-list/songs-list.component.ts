import { Component, OnInit } from '@angular/core';
import { SongsService } from 'src/app/services/songs.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {

  songs:any[]=[];
  arrSongs = new BehaviorSubject<any[]>([]);


  constructor(
    private songService:SongsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(){
    this.songService.getAll()
      .subscribe(data => {
        console.log(data)
        this.songs = data;
        this.arrSongs.next(data);
      })
        }

}

