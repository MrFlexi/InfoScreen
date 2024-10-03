// src/app/services/photo.service.ts
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  async takePhoto(): Promise<string> {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90
    });

    const base64Data = await this.readAsBase64(image);

    const fileName = new Date().getTime() + '.jpeg';
    await Filesystem.writeFile({
      path: `pictures/${fileName}`,
      data: base64Data,
      directory: Directory.Data
    });

    return fileName;
  }

  private async readAsBase64(photo: Photo): Promise<string> {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
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
}

