import { Injectable } from '@angular/core';
import { Geolocation, Position} from '@capacitor/geolocation';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})



export class GeolocationService {
latitude: any;
longitude: any;
speed: any;
altitude: any;
timestamp: string;

public geoTicker: Observable<any>;

constructor(public toastCtrl: ToastController) {

  if (!Geolocation.checkPermissions())
  {
    console.log('GPS request position');
    Geolocation.requestPermissions();
  }
  

  this.geoTicker = new Observable((observer) => {
    let watchId: any;
    // Simple geolocation API check provides values to publish
    if ('geolocation' in navigator) {
      watchId = Geolocation.watchPosition({}, (position, err) => {
        console.log('GPSService update received', position);
        this.latitude = position?.coords.latitude;
        this.longitude = position?.coords.longitude;
        this.speed = position?.coords.speed;
        this.altitude = position?.coords.altitude;
        //this.timestamp = this.datePipe.transform(position?.timestamp, 'yyyy-MM-dd HH:mm:ss');
        this.timestamp = position?.timestamp.toString();
        observer.next(position);    // Bradcast actual position
      });
    }
    else
    {
      console.log('The browser does not support geolocation');
    }
  });

  this.geoTicker.subscribe({
    next(position){
      console.log('Position Update: ', position);      
    }
  });
 }

 async getGeolocation(){
  const coordinates = await Geolocation.getCurrentPosition();
  this.latitude = coordinates.coords.latitude;
  this.longitude = coordinates.coords.longitude;
  this.speed = coordinates.coords.speed;
 }

 async showToast(msg: string) {
  const toast = await this.toastCtrl.create({
    message: msg,
    position: 'top',
    duration: 1000
  });
  toast.present();
}

}
