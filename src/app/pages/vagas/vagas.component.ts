import { VagasService } from './../../shared/services/vagas.service';
import { Component, OnInit } from '@angular/core';
import { Vagas } from 'src/app/shared/interfaces/vagas';
import { take } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.scss']
})
export class VagasComponent implements OnInit {

  vagas: Vagas[] = [];

  constructor(
    private vagasService: VagasService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.vagasService.getVagas()
      .pipe(take(1))
      .subscribe((vagas: Vagas[]) => {
        this.vagas = vagas;
      })
  }

  deletarVaga(indexVaga: number){
    let vagaId = this.vagas[indexVaga].id;

    this.vagasService.removerVaga(vagaId)
      .pipe(take(1))
      .subscribe(() => {
        this.snackBar.open("Vaga deletado com sucesso!", "Fechar", { duration: 3000 });
        location.reload();
      }, (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, "Fechar", { duration: 3000 });
      })
  }

}
