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
  @Input()
  blockModalClose = false;
  @Output()
  isModalOpenedChange = new EventEmitter<boolean>();
  @Input()
  clrModalClosable = false;
  @Input()
  showCancelButton = true;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(submit: boolean) {
    // for submit button, if the flag is blocking, then do not close the modal when clicking the close button, wait for the task to finish
    if(!this.blockModalClose || !submit) {
      this.isModalOpened = false;
      this.isModalOpenedChange.emit(false);
    }
    if (submit) {
      this.onModalSubmitted.emit();
    } else {
      this.onModalCanceled.emit();
    }
  }
}
