// src/app/tab1/tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NavController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { Dataset, ty_Photo } from '../models/dataset.model';  // Import the dataset interface


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  //datasets: any[] = [];

  constructor(public dataService: DataService, 
              public photoService: PhotoService,
              private navCtrl: NavController) {}

  ngOnInit() {
  }


  viewImage(id: string) {
    // logic to view image fullscreen
    this.navCtrl.navigateForward(['/edit-dataset', id]);    
  }
}

