import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from './cliente.service';
import { ModalController, ToastController } from '@ionic/angular';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { Cliente } from './model/cliente';

@Component({
    selector: 'app-cliente-add-page',
    templateUrl: './cliente-add.page.html'
})

export class ClienteAddPageComponet implements OnInit {

    clientForm = this.fb.group({
        nome: ['', Validators.required],
        cpf: ['']
    })

    constructor(private fb: FormBuilder,
        private service: ClienteService,
        private toastController: ToastController,
        private modalCtrl: ModalController) { }

    ngOnInit() { }

    async salvar() {
        if (this.clientForm.valid) {
            this.service.salvar(this.clientForm.value)
                .pipe(
                    catchError(async (err: any, caugh: Observable<any>) => {
                        const toast = await this.toastController.create({
                            message: 'Erro ao salvar um cliente',
                            duration: 3000,
                            position: 'top',
                        });

                        await toast.present();
                        return new Error('Erro ao salvar')
                    })
                )
                .subscribe(async (cliente) => {
                    const toast = await this.toastController.create({
                        message: 'Cliente ' + cliente.nome + ' salvo com sucesso',
                        duration: 1500,
                        position: 'top',
                    });
                    this.modalCtrl.dismiss(null, 'salvo')
                    await toast.present();
                })
        }
    }


}