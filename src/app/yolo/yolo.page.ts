import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PhotoService } from '../services/photo.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Swiper } from 'swiper';
import { ModalController } from '@ionic/angular';
import { FullscreenImageComponent } from '../fullscreen-image/fullscreen-image.component';
import { Dataset, ty_Photo } from '../models/dataset.model';  // Import the dataset interface
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-yolo',
  templateUrl: './yolo.page.html',
  styleUrls: ['./yolo.page.scss'],
})

export class YoloPage implements OnInit {

  imageUrl: string | null = null; // To display the captured image
  apiUrl: string = 'http://85.209.49.65:41900/detect'; // Replace with your API endpoint
  infoText: string = 'Take a photo first....';

  photo_original: ty_Photo = {    
    name: '',
    description: '',
    picture: '',
    filepath: '',
    webviewPath: '',
    createdBy: '',
    createdAt: '',
  }

  pictureUrl: string | undefined;
  jsonData: any = {
    "result_url": "",
    "statistics": [
      { "className": "take a photo...", "classCount": 0 }
    ],
    "predictions": [
      {
        "x_min": 96.9,
        "y_min": 15.2,
        "x_max": 247.2,
        "y_max": 142.9,
        "confidence": 0.8840435743331909,
        "class_id": 6,
        "class_name": "train"
      }
    ],
    "barcodes": {}
  };

  constructor(public photoService: PhotoService, private http: HttpClient) { }

  ngOnInit() {
  }

  async takePicture() {
      const timestamp = new Date().toISOString();
      const newPicture = await this.photoService.addNewToGallery();
  
      this.photo_original.webviewPath = newPicture.webviewPath;    // Put all images into array
      this.photo_original.filepath = newPicture.filepath;    
      this.photo_original.createdAt = timestamp;
      this.infoText='Sending to Yolo...'
      this.detectPhoto(this.photo_original.webviewPath)
    }

    async detectPhoto(webPath: string) {
      try {
        // Convert webPath to a Blob
        const fileBlob = await this.fetchBlobFromWebPath(webPath);
    
        // Create a FormData object
        const formData = new FormData();
        formData.append('image', fileBlob, 'photo.jpg');
    
        // Upload the FormData object
        this.http.post(this.apiUrl, formData).subscribe({
          next: response => {
            console.log('Upload successful', response)
            this.jsonData = response
            this.infoText = 'done'
          },
          error: error => console.error('Upload failed', error),
        });
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }

    async fetchBlobFromWebPath(webPath: string): Promise<Blob> {
      const response = await fetch(webPath);
      return await response.blob();
    }



}
