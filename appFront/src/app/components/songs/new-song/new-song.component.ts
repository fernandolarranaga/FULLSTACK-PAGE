import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SongsService } from 'src/app/services/songs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {

  formulario: FormGroup;

  constructor(private songService: SongsService, private router: Router) {
    this.formulario = new FormGroup({
      title: new FormControl(),
      artist: new FormControl(),
      genre: new FormControl(),
      album: new FormControl(),
      duration: new FormControl(),
      photo:new FormControl(),
      year: new FormControl(),
      trackNumber: new FormControl(),
      isExplicit: new FormControl(),
      authorId: new FormControl(),
      authorEmail: new FormControl()
    });
  }

  onSubmit() {
    console.log(this.formulario.value);

    const authorId = 'author_id_here';
    const authorEmail = 'author_email_here';

    this.formulario.patchValue({
      authorId,
      authorEmail
    });

    this.songService.create(this.formulario.value).subscribe(
      (response: any) => { 
        console.log('Canción creada exitosamente:', response);
        this.router.navigate(['/songs']);
      },
      (error) => {
        console.error('Error al crear la canción:', error);
      }
    );
  }

  ngOnInit(): void {
  }

}
