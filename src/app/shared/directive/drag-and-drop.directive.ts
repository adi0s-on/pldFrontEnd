import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[dragAndDrop]'
})
export class DragAndDropDirective {

  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private bgColor = '#9e9e9e';
  @HostBinding('style.opacity') private opacity = '0.5';


  @HostListener('dragover', ['$event']) onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.bgColor = '#fcee09';
    this.opacity = '0.2';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.bgColor = '#9e9e9e';
    this.opacity = '0.5';
  }

  @HostListener('drop', ['$event']) public onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.bgColor = '#9e9e9e';
    this.opacity = '0.5';

    const file = e.dataTransfer.files[0];
    if (!!file) {
      this.onFileDropped.emit(file);
    }
  }
}
