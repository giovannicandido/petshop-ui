import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Observable, debounceTime, filter } from 'rxjs';
import { Cliente } from './model/cliente';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ClienteAddPageComponet } from './cliente-add.page';

@Component({
    selector: 'app-cliente-list',
    templateUrl: './cliente-list.page.html'
})

export class ClienteListPageComponent implements OnInit {
    list$!: Observable<Cliente[]>

    searchForm = this.fb.group({
        nome: []
    })

    constructor(private service: ClienteService,
        private fb: FormBuilder,
        private modalController: ModalController) { }

    ngOnInit() {

        this.searchForm.valueChanges
            .pipe(
                filter((value) => value != null && value != undefined),
                debounceTime(400)
            )
            .subscribe((value) => {

                this.procurar(value.nome!)
            })

        this.list$ = this.service.listar()
    }

    procurar(nome: string) {
        this.list$ = this.service.pesquisar(nome)
    }

    async abrirAdicionar() {
        const modal = await this.modalController.create({ component: ClienteAddPageComponet });
        await modal.present()

        const { data, role } = await modal.onWillDismiss();

        if (role === 'salvo') {
            this.list$ = this.service.listar()
        }
    }
}