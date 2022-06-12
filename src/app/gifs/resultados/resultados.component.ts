import { GifsService } from './../services/gifs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  get resultados(){
    return this.gifsService.resultados;
  }

  constructor(private gifsService: GifsService) { }

}
