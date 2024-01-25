import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  baseURL = "http://localhost:3000/api/songs"
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getById(songId: string) {
    return firstValueFrom(
      this.http.get<any>(`${this.baseURL}/${songId}`)
    );
  }
  create(formValues: any): Observable<any> {
    return this.http.post<any>(this.baseURL, formValues);
  }
  
  update(songId:string, formValues: any) {
    return firstValueFrom(
      this.http.put(`${this.baseURL}/${songId}`, formValues)
    )
  }

  deleteById(songid:string){
    return firstValueFrom(
      this.http.delete<any>(`${this.baseURL}/${songid}`))
  }

}
