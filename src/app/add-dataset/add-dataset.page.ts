// src/app/add-dataset/add-dataset.page.ts
import { Component } from '@angular/core';
import { Dataset } from '../models/dataset.model';  // Import the dataset interface
import { DataService } from '../services/data.service';
import { PhotoService } from '../services/photo.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-dataset',
  templateUrl: './add-dataset.page.html',
  styleUrls: ['./add-dataset.page.scss'],
})
export class AddDatasetPage {
  dataset: Dataset = {
    id: '',           // Will generate a unique ID later
    name: '',
    description: '',
    picture: '',
    createdBy: '',
    createdAt: ''
  };
  pictureUrl: string | undefined;

  constructor(
    private dataService: DataService,
    private photoService: PhotoService,
    private navCtrl: NavController
  ) {}

  async takePicture() {
    const fileName = await this.photoService.takePhoto();
    this.dataset.picture = fileName;
    this.pictureUrl = `pictures/${fileName}`;
  }

  async saveDataset() {
    const timestamp = new Date().toISOString();
    this.dataset.id = new Date().getTime().toString();  // Generate unique ID based on current time
    this.dataset.createdAt = timestamp;    
    await this.dataService.addDataset(this.dataset);
    this.navCtrl.navigateBack('/tabs/tab1');
  }
}

