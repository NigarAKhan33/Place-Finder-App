import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../_configs/app.config';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageService } from './storage.service';
import { AlertsService } from './alerts.service';
import { NavController, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Location } from '@angular/common';
import { SplashScreen } from '@capacitor/splash-screen';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  loggedUser = {
    firstName: null,
    surName: null,
    companyName: null,
    mobileNumber: null,
    emailAddress: null,
  };
  allLoaded = false;

  constructor(private storage: StorageService, private alertsService: AlertsService, private _location: Location, private navCtrl: NavController) {
    //
  }

  getStorageVariables(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.storage.init().then(res => {
        Promise.all([this.storage.get('loggedUser')]).then((values) => {
          if (values[0]) {
            this.loggedUser = values[0];
            resolve();
          } else {
            reject();
          }
        }).catch((err) => {
          reject();
        });
      }).catch(err => {
        reject();
      })
    });
  }

  proceedWithDeviceFeatures() {
    SplashScreen.hide();
    StatusBar.show();
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setStyle({ style: Style.Dark });
    //
    App.addListener('backButton', ({ canGoBack }) => {
      // console.log({ canGoBack });
      // if (this._location.isCurrentPathEqualTo('/main-page')) {
      this.alertsService.presentCustomConfirm('Place Finder:', 'Are you sure you want to quit the application?', 'Ok', 'Cancel').then(() => {
        App.exitApp();
      });
      // } else {
      // window.history.back();
      // this._location.back();
      // this.navCtrl.navigateRoot(['main-page']);
      // }
    });
    // App.addListener('resume', () => {
    //   this.alertsService.presentAlert('Place Finder:', 'Welcome back ' + this.loggedUser + '!');
    // });
  }

}
