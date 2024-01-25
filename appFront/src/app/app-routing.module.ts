import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsListComponent } from './components/songs/songs-list/songs-list.component';
import { DetailSongComponent } from './components/songs/detail-song/detail-song.component';
import { NewSongComponent } from './components/songs/new-song/new-song.component';
import { EditSongComponent } from './components/edit-song/edit-song.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import {LoginGuard} from './guards/login.guard'

const routes: Routes = [
  {path: 'songs',
   component:SongsListComponent,
   canActivate:[LoginGuard]
  },
  {path: 'songs/new', component:NewSongComponent,  canActivate:[LoginGuard]},
  {path: 'songs/edit/:songId', component:EditSongComponent,  canActivate:[LoginGuard]},
  {path: 'songs/:songId', component:DetailSongComponent,  canActivate:[LoginGuard]},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
