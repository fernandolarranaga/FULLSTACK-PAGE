import { Component, OnInit } from '@angular/core';
import { SongsService } from 'src/app/services/songs.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {
  
  song:any;

  constructor(
    private songService: SongsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.songService.getById(params['songId'])
        .then(song => this.song = song)
        .catch(err => console.log(err));
    });
  }

  onClickBorrar(songId: string) {
    const confirmacion = window.confirm("¿Estás seguro de que quieres borrar esta canción?");
  
    if (confirmacion) {
      this.songService.deleteById(songId)
        .then(data => {
          console.log(data);
          this.router.navigate(['/songs']); // Redirige a la ruta '/songs'
        })
        .catch(error => {
          console.error('No tienes acceso a este dato:', error);
          alert('No tienes acceso a este dato.');
          this.router.navigate(['/songs']);
        });
    } else {
      console.log('Borrado cancelado por el usuario.');
    }
  }

}
