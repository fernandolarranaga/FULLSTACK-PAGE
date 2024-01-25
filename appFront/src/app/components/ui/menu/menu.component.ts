import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private router:Router,
    public service:UsersService
    ) { }

  ngOnInit(): void {
  }
  onClicklogout(){
    localStorage.removeItem('token_songs');
    this.router.navigate(['/login'])

  }
}
