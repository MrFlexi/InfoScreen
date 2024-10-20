import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ty_Webcam } from '../models/dataset.model';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebcamService {

  public webcams: ty_Webcam[];

  constructor(private http: HttpClient) {   
    this.getWebcams();
  }

  async getWebcams(): Promise<ty_Webcam[]> {
    try {
      const data = await firstValueFrom(this.http.get<ty_Webcam[]>('assets/webcams.json'));
      this.webcams = data;
      console.log('loading webcams:', data);
      return data;
    } catch (error) {
      console.error('Error loading webcams:', error);
      throw error; // or handle it as needed
    }
  } 

}