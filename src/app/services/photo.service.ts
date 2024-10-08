// src/app/services/photo.service.ts
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Dataset } from '../models/dataset.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private platform: Platform;

  constructor(platform: Platform) { 
    this.platform = platform;
  }



  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });
  
    // Save the picture and add it to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto);   
    console.log(savedImageFile);
    return savedImageFile;
  }

  private async savePicture(photo: Photo) {   
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);  
    // Write the file to the data directory
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
  
    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      };
    }
  }

  public async loadAllPictures(datasets: Dataset[]) { 
 
    if (!this.platform.is('hybrid')) {
      console.log("Load Photo hybrid");
      // Display the photo by reading into base64 format
      for (let dataset of datasets) {
        // Read each saved photo's data from the Filesystem
        console.log("Load Photo" + dataset.filepath)  

        const readFile = await Filesystem.readFile({
            path: dataset.filepath,
            directory: Directory.Data
        });  
        // Web platform only: Load the photo as base64 data
        dataset.webviewPath = `data:image/jpeg;base64,${readFile.data}`;


        for (let photo_single of dataset.photos) {
          // Read each saved photo's data from the Filesystem
          console.log("Load Photo" + photo_single.filepath)  
  
          const readFile = await Filesystem.readFile({
              path: photo_single.filepath,
              directory: Directory.Data
          });  
          // Web platform only: Load the photo as base64 data
          photo_single.webviewPath = `data:image/jpeg;base64,${readFile.data}`;  
        }


      }
    }
  }


  
  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!
      });
  
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
  
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  private convertBlobToBase64(blob: Blob): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }

  async getImageUrl(fileName: string):  Promise<string> {
    return "assets/nix.png"
  }  
  

}

