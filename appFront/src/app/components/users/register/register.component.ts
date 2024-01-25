import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;


  constructor(
    private userService: UsersService,
    private router: Router,) {
    
    this.formulario= new FormGroup({
      username:new FormControl(),
      email:new FormControl(),
      password:new FormControl(),
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
this.userService.register(this.formulario.value)
.then(data=>console.log(data))
this.router.navigate(['/songs'])
  }

}
