import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modals : IModal[] = [];

  constructor() { }

  register(id: string){
    this.modals.push({id, visible: false})
  }
  unregister(id: string){
    this.modals.filter((item => item.id !== id))
  }


  isOpenModal(id: string){

    return !!this.modals.find(item => item.id === id)?.visible;
  }


  toggleModal(id: string){
    const modal = this.modals.find(item => item.id === id );
    if(modal){
      modal.visible = !modal.visible
    }
  }

}
