// src/app/add-dataset/add-dataset.page.ts
import { Component } from '@angular/core';
import { Dataset, ty_Photo } from '../models/dataset.model';  // Import the dataset interface
import { DataService } from '../services/data.service';
import { PhotoService } from '../services/photo.service';
import { NavController } from '@ionic/angular';
import { Swiper } from 'swiper';
import { ElementRef, ViewChild } from '@angular/core';



@Component({
  selector: 'app-add-dataset',
  templateUrl: './add-dataset.page.html',
  styleUrls: ['./add-dataset.page.scss'],
})


export class AddDatasetPage {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

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

    const timestamp = new Date().toISOString();
    const newPicture = await this.photoService.addNewToGallery();

    if ( this.photo_array.length < 1) {                     // Show first image on list header
      console.log("First entry")
      this.dataset.webviewPath = newPicture.webviewPath;
      this.dataset.filepath = newPicture.filepath; 
      this.dataset.createdAt = timestamp;
    }    

    photo_single.webviewPath = newPicture.webviewPath;    // Put all images into array
    photo_single.filepath = newPicture.filepath;    
    photo_single.createdAt = timestamp;
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

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }
 
  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }
 
  goNext() {
    this.swiper?.slideNext();
  }
 
  goPrev() {
    this.swiper?.slidePrev();
  }
}

