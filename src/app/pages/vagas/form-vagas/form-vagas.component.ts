import { HttpErrorResponse } from '@angular/common/http';
import { Vagas } from './../../../shared/interfaces/vagas';
import { VagasService } from './../../../shared/services/vagas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-form-vagas',
  templateUrl: './form-vagas.component.html',
  styleUrls: ['./form-vagas.component.scss']
})
export class FormVagasComponent implements OnInit {

  form = this.fb.group({
    id: ['', [Validators.required]],
    nome: ['', [Validators.required]],
    foto: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    salario: ['', [Validators.required]],
    palavrasChaves: [[], [Validators.required]]
  })

  vagaId: number = this.activatedRoute.snapshot.params.vagaId;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  palavrasChaves: any = [];

  constructor(
    private vagasService: VagasService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private Route: Router
  ) { }

  ngOnInit() {
    if(this.vagaId){
      this.vagasService.getVagaId(this.vagaId)
        .pipe(take(1))
        .subscribe((vaga: Vagas) => {
          this.form.patchValue(vaga);
          this.palavrasChaves = vaga.palavrasChaves;
        }, (error: HttpErrorResponse) => {
          this.snackBar.open(error.message, "Fechar", { duration: 3000 });
        });
    }
  }

  submit(){
    if(this.form.valid){
      if(this.vagaId)
        var method = this.vagasService.atualizarVaga(this.vagaId, this.form.value);
      else
        var method = this.vagasService.cadastrarVaga(this.form.value);

      method.pipe(take(1))
        .subscribe(() => {
          this.snackBar.open(`Vaga ${this.vagaId ? 'atualizada' : 'criada'} com sucesso!`, "Fechar", { duration: 3000 });
          this.Route.navigateByUrl('/vagas');
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.message, "Fechar", { duration: 3000 });
        });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.palavrasChaves.push(value);
      this.form.get('palavrasChaves')?.patchValue(this.palavrasChaves);
    }

    event.chipInput!.clear();
  }

  remove(palavraChave: string): void {
    const index = this.palavrasChaves.indexOf(palavraChave);

    if (index >= 0) {
      this.palavrasChaves.splice(index, 1);
      this.form.get('palavrasChaves')?.patchValue(this.palavrasChaves);
    }
  }
}
