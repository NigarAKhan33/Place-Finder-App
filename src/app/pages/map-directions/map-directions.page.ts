import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { GlobalsService } from 'src/app/_providers/globals.service';

@Component({
  selector: 'app-map-directions',
  templateUrl: './map-directions.page.html',
  styleUrls: ['./map-directions.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MapDirectionsPage implements OnInit {

  constructor(private navCtrl: NavController, private globalsService: GlobalsService) {
    if (!this.globalsService.allLoaded) {
      this.navCtrl.navigateRoot(['loader']);
      return;
    }
  }

  ngOnInit() {
  }

}
