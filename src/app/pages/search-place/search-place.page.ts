import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, LoadingController } from '@ionic/angular';
import { GlobalsService } from 'src/app/_providers/globals.service';
import { Geolocation } from '@capacitor/geolocation';
import { AlertsService } from 'src/app/_providers/alerts.service';
import { addIcons } from "ionicons";
import { iconList } from 'src/app/_providers/ionicons_imports';
import { Network } from '@capacitor/network';
import { StorageService } from 'src/app/_providers/storage.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics'

addIcons(iconList);

declare let google;

@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.page.html',
  styleUrls: ['./search-place.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SearchPlacePage implements OnInit {

  searchResults = [];
  searchFilter = {
    type: 'restaurant',
    distance: '2000'
  }
  isNetworkConnected = true;

  constructor(private navCtrl: NavController, private globalsService: GlobalsService, private loadingCtrl: LoadingController, private alertsService: AlertsService, private storage: StorageService) {
    if (!this.globalsService.allLoaded) {
      this.navCtrl.navigateRoot(['loader']);
      return;
    }
    this.networkCheck();
  }

  async networkCheck() {
    const status = await Network.getStatus();
    console.log({ status });
    this.isNetworkConnected = status.connected;
    //
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.isNetworkConnected = status.connected;
    });
    console.log('subscribed');
  }

  ngOnInit() {
  }

  ionViewDidLeave() {
    Network.removeAllListeners();
    console.log('unsubscribed');
  }

  async searchClick() {
    const status = await Network.getStatus();
    console.log({ status });
    this.isNetworkConnected = status.connected;
    //
    if (!this.isNetworkConnected) {
      this.alertsService.presentAlert('Place Finder:', 'Network is unavailable, please make sure that internet is connected on your device.');
      return;
    }
    this.searchResults = [];
    let loader = await this.loadingCtrl.create({
      message: "Searching nearby..."
    });
    loader.present();
    Geolocation.getCurrentPosition().then((response) => {

      console.log({ response });
      console.log({ google });

      let service = new google.maps.places.PlacesService(document.createElement('div'));
      service.nearbySearch({
        location: { lat: response.coords.latitude, lng: response.coords.longitude },
        radius: this.searchFilter.distance,
        type: [this.searchFilter.type]
      }, (results, status) => {
        this.callback(results, status, loader);
      });
    }).catch(err => {
      loader.dismiss();
      this.alertsService.presentAlert('Place Finder:', 'Location is unavailable, please make sure that GPS/Location is enabled on your device.');
    });
  }

  callback(results, status, loader) {
    console.log({ results });
    console.log({ status });
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        // this.createMarker(results[i]);
        this.searchResults.push({
          name: results[i].name,
          vicinity: results[i].vicinity,
          rating: results[i].rating,
        });
      }
      if (this.searchResults.length == 20) {
        this.alertsService.presentAlert('Place Finder:', 'Here are top 20 results with the selected criteria!!');
      }
    } else {
      this.alertsService.presentAlert('Place Finder:', 'Could not find any place with the selected criteria..');
    }
    loader.dismiss();
  }

  async logOutClick() {
    await Haptics.vibrate();
    this.alertsService.presentCustomConfirm('Place Finder:', 'Are you sure you want to Logout?', 'Ok', 'Cancel').then(() => {
      this.globalsService.loggedUser = null;
      this.storage.clear();
      this.navCtrl.navigateRoot(['login']);
    });
  }

}
