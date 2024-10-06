import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-fullscreen-image',
  templateUrl: './fullscreen-image.component.html',
  styleUrls: ['./fullscreen-image.component.scss'],
})
export class FullscreenImageComponent  implements OnInit {
  @Input() image: string;
  name: string;

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalController.dismiss(this.name, 'confirm');
  }

  ngOnInit() {}

}
