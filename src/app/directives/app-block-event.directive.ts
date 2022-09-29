import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppBlockEvent]'
})
export class AppBlockEventDirective {

@HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  handleBlockEvent(event: Event){
    event.preventDefault()
  }

}
