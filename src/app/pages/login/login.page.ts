import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from "ionicons";
import { iconList } from 'src/app/_providers/ionicons_imports';
import { GlobalsService } from 'src/app/_providers/globals.service';
import { AlertsService } from 'src/app/_providers/alerts.service';
import { StorageService } from 'src/app/_providers/storage.service';

addIcons(iconList);

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  un;
  pw;

  constructor(private navCtrl: NavController, private globalsService: GlobalsService, private alertsService: AlertsService, private storage: StorageService) {
    if (!this.globalsService.allLoaded) {
      this.navCtrl.navigateRoot(['loader']);
      return;
    }
  }

  ngOnInit() {
  }

  loginClick() {
    if (this.un != this.pw) {
      this.alertsService.presentAlert('Place Finder:', 'Please check the username and password you have entered.');
    } else {
      this.storage.set('loggedUser', this.un);
      this.navCtrl.navigateRoot(['search-place']);
    }
  }

}
