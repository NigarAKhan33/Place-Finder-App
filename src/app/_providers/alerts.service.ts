import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private alertCtrl: AlertController) { }

  async presentAlert(title, message, okText = 'Ok') {
    return new Promise(async resolve => {
      const element = await this.alertCtrl.getTop();
      if (element) {
        element.dismiss().then(async () => {
          let alertPop = await this.alertCtrl.create({
            header: title,
            message: message,
            cssClass: 'present-alert',
            backdropDismiss: false,
            buttons: [
              {
                text: okText,
                handler: () => {
                  resolve(1);
                },
                cssClass: "btn-custom-primary"
              }
            ]
          });
          alertPop.present();
        });
      } else {
        let alertPop = await this.alertCtrl.create({
          header: title,
          message: message,
          cssClass: 'present-alert',
          backdropDismiss: false,
          buttons: [
            {
              text: okText,
              handler: () => {
                resolve(1);
              },
              cssClass: "btn-custom-primary"
            }
          ]
        });
        alertPop.present();
      }
    });
  }

  async presentCustomConfirm(title, message, btn1Text, btn2Text, isBothPrimary = false): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let buttons = [
        {
          text: btn1Text,
          handler: () => {
            resolve(1);
          },
          cssClass: isBothPrimary ? "btn-custom-primary" : "btn-custom-secondary"
        }
      ];
      if (btn2Text) {
        buttons.push(
          {
            text: btn2Text,
            handler: () => {
              reject();
            },
            cssClass: "btn-custom-primary"
          }
        )
      }
      let confirmPopup = await this.alertCtrl.create({
        header: title,
        message: message,
        cssClass: 'present-alert-custom',
        backdropDismiss: false,
        buttons: buttons
      });
      confirmPopup.present();
    });
  }

}
