import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsComponent } from '../ModalPopups/settings/settings.component';

import '@ui5/webcomponents/dist/Button.js';
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-fiori/dist/Timeline.js";
import "@ui5/webcomponents-fiori/dist/TimelineItem.js";
import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/calendar.js";


@Component({
  selector: 'app-ui5-tab',
  templateUrl: './ui5-tab.page.html',
  styleUrls: ['./ui5-tab.page.scss'],
})
export class Ui5TabPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  async openSettings() {
    const modal = await this.modalCtrl.create({
      component: SettingsComponent,
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
