import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private baseUrl:string;
  constructor(private httpClient:HttpClient) { 
    this.baseUrl='http://localhost:3000/api/users'
  }

  register(formValue:any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, formValue)
    )
  }

  login(formValue:any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, formValue)
    )
  }

  isLogged(){
    return localStorage.getItem('token_songs')?true:false
  }
  
  
}
