import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/_providers/storage.service';
import { GlobalsService } from 'src/app/_providers/globals.service';
import { DomSanitizer } from '@angular/platform-browser';
// import { Directory, Filesystem } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
// import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App } from '@capacitor/app';
import { AlertsService } from 'src/app/_providers/alerts.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoaderPage implements OnInit {

  constructor(private storage: StorageService, private globalsService: GlobalsService, private navCtrl: NavController, private sanitizer: DomSanitizer, private alertsService: AlertsService, private _location: Location) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.globalsService.getStorageVariables().then((res) => {
      this.step2(true);
    }).catch((err) => {
      this.step2(false);
    });
  }

  step2(bMyDetailsFound: any) {
    this.globalsService.allLoaded = true;
    if (bMyDetailsFound) {
      this.navCtrl.navigateRoot(['search-place']);
    } else {
      this.navCtrl.navigateRoot(['login']);
    }
    if (Capacitor.isNativePlatform()) {
      setTimeout(() => {
        this.globalsService.proceedWithDeviceFeatures();
      }, 0);
    }
  }

}
