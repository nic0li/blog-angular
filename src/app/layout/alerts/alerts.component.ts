import { Component, Input, OnInit, Inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alerts.component',
  imports: [],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css',
})
export class AlertsComponent implements OnInit {

  constructor(
    @Inject(BsModalRef) public modal: BsModalRef
  ) { }

  @Input() message: string | undefined;
  @Input() type: string = 'success';

  ngOnInit() {}

  onClose() {
    this.modal.hide();
  }
  
}
