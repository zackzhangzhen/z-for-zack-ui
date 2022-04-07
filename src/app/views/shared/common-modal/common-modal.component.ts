import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.css']
})
export class CommonModalComponent implements OnInit {

  @Output()
  private onModalSubmitted = new EventEmitter<any>();
  @Output()
  private onModalCanceled = new EventEmitter<any>();
  @Input()
  modalSubmitDisabled = true;
  @Input()
  isModalOpened = true;
  @Output()
  isModalOpenedChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(submit: boolean) {
    this.isModalOpened = false;
    this.isModalOpenedChange.emit(false);
    if (submit) {
      this.onModalSubmitted.emit();
    } else {
      this.onModalCanceled.emit();
    }
  }
}
