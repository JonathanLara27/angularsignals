import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../assets/environments/environment'
import { catchError, throwError } from 'rxjs';
import { CharacterResponse } from '../interfaces';


const URL=environment.url;

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private _http= inject(HttpClient)

  constructor() { }
  getAllCharactersPage  = (page: number) => this._http.get<CharacterResponse>(`${URL}/character?page=${page}`).pipe(
    catchError((error) => {
      return throwError(() => `Error al obtener los personajes ${error.error.message}`);
    })
  )

  getCharacterByName = (page: number,name: string,) => this._http.get<CharacterResponse>(`${URL}/character/?page=${page}&name=${name}`).pipe(
    catchError((error: any) => {
      return throwError(() => `Error al obtener el personaje ${name}. No existe.`);
    })
  )
}
