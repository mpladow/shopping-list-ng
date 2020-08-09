import { Injectable } from '@angular/core';
import * as alertify from "alertifyjs";

@Injectable({
  providedIn: "root",
})
// Wrap Alertify as an Angular Service
export class AlertifyService {
  constructor() {}
  success(message: string) {
    alertify.success(message);
  }

  confirm(title: string, message: string, okCallback: () => any) {
    alertify.confirm(title, message, (e: any) => {
      if (e) {
        okCallback();
      } else {
      }
    }, ()=>{});
  }
  warning(message: string) {
    alertify.warning();
  }
  error(message: string) {
    alertify.error(message);
  }
  message(message: string) {
    alertify.message(message);
  }
}
