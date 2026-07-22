import { Service, inject } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertsComponent } from '../layout/alerts/alerts.component';

@Service()
export class AlertsService {

  private bsModalService = inject(BsModalService);

  private showAlert(message: string, type: string) {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertsComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }

  showAlertDanger(message: string) {
    this.showAlert(message, 'danger');
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, 'success');
  }

  showAlertInfo(message: string) {
    this.showAlert(message, 'info');
  }

}
