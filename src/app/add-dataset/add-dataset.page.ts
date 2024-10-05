// src/app/add-dataset/add-dataset.page.ts
import { Component } from '@angular/core';
import { Dataset, ty_Photo } from '../models/dataset.model';  // Import the dataset interface
import { DataService } from '../services/data.service';
import { PhotoService } from '../services/photo.service';
import { NavController } from '@ionic/angular';
import { Photo } from '@capacitor/camera';

@Component({
  selector: 'app-add-dataset',
  templateUrl: './add-dataset.page.html',
  styleUrls: ['./add-dataset.page.scss'],
})
export class AddDatasetPage {

  photo_array: ty_Photo[] = [];


  dataset: Dataset = {
    id: '',           // Will generate a unique ID later
    name: '',
    description: '',
    picture: '',
    filepath: '',
    webviewPath: '',
    createdBy: '',
    createdAt: '',
    photos:[]
  };

  pictureUrl: string | undefined;

  constructor(
    private dataService: DataService,
    public photoService: PhotoService,
    private navCtrl: NavController
  ) {}

  async takePicture() {

    var photo_single: ty_Photo = {    
      name: '',
      description: '',
      picture: '',
      filepath: '',
      webviewPath: '',
      createdBy: '',
      createdAt: '',
    }

    const newPicture = await this.photoService.addNewToGallery();

    if ( this.photo_array.length < 1) {                     // Show first picture on list
      console.log("First entry")
      this.dataset.webviewPath = newPicture.webviewPath;
      this.dataset.filepath = newPicture.filepath; 
    }    

    photo_single.webviewPath = newPicture.webviewPath;
    photo_single.filepath = newPicture.filepath;    
    this.photo_array.push(photo_single)
    console.log("Array lenght"+this.photo_array.length)

  }

  async saveDataset() {
    const timestamp = new Date().toISOString();
    this.dataset.id = new Date().getTime().toString();  // Generate unique ID based on current time
    this.dataset.createdAt = timestamp;
    this.dataset.photos = this.photo_array;    
    await this.dataService.addDataset(this.dataset);
    this.navCtrl.navigateBack('/tabs/tab1');
  }
}

