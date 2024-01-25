import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsService } from 'src/app/services/songs.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css'],
})
export class EditSongComponent implements OnInit {
  formEdit: FormGroup;
  songId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private songService: SongsService,
    private router: Router
  ) {
    this.formEdit = new FormGroup({
      title: new FormControl(),
      artist: new FormControl(),
      genre: new FormControl(),
      album: new FormControl(),
      photo:new FormControl(),
      duration: new FormControl(),
      year: new FormControl(),
      trackNumber: new FormControl(),
      isExplicit: new FormControl(),
    });
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.songId = params['songId'];
      this.songService
        .getById(this.songId)
        .then((song) => {
          delete song._id;
          delete song.__v;
          this.formEdit.setValue(song);
        })
        .catch((error) => {
          console.error('Error al obtener los datos de la canción:', error);
        });
    });
  }

  onSubmit() {
    this.songService.update(this.songId, this.formEdit.value);
    this.router.navigate(['/songs']); // Redirige a la ruta '/songs'
  }
   onClickEditar(){
    this.songService.update(this.songId, this.formEdit.value)
    .then(data => {
      console.log(data);
      this.router.navigate(['/songs']); // Redirige a la ruta '/songs'
    })
    .catch(error => {
      console.error('No tienes acceso a este dato:', error);
      alert('No tienes acceso a este dato.');
      this.router.navigate(['/songs'])
    });
    } 
}
