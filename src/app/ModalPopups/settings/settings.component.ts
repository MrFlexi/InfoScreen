import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [FormsModule, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonTitle, IonToolbar],
})
export class SettingsComponent{

  name!: string;

  constructor() {}


}


