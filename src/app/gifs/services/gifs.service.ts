import { Gif, SearchGifsResponse } from './../interfaces/gifs.interface';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {;
  private apiKey: string = environment.api_key_giphy
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('ultimos_resultados')!) || [];
  }

  buscarGifs( query:string){

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify( this._historial));
      
    }
    const params = new HttpParams()
                  .set('api_key', this.apiKey)
                  .set('q', query)
                  .set('limit', 10);
            
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe((resp) =>{
      this.resultados = resp.data;
      localStorage.setItem('ultimos_resultados', JSON.stringify( this.resultados));
    })
  }
}
