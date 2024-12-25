import { Injectable } from '@angular/core';
import { Geolocation, Position} from '@capacitor/geolocation';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class GeolocationService {
speed: any;
timestamp: string;
latitude: number | null = null;
longitude: number | null = null;
altitude: number | null = null;
errorMessage: string | null = null;

private locationSubscription: Subscription | null = null;

constructor(public toastCtrl: ToastController) {

  console.log('Service constructor');
  if (!Geolocation.checkPermissions())
  {
    console.log('GPS request position');
    Geolocation.requestPermissions();
  }

  
  this.locationSubscription = this.getLocationUpdates().subscribe({
    next: (position: Position) => {
      console.log('API subscription GPS update', position);
      this.latitude =   position?.coords.latitude;
      this.longitude =  position?.coords.longitude;
      this.speed =      position?.coords.speed;
      this.altitude =   position?.coords.altitude;
      console.log('API Subscription Altitude', this.altitude);
    },
    error: (error) => {
      this.errorMessage = error;
    },
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


getLocationUpdates(): Observable<Position> {
  return new Observable<Position>((observer) => {
    // Watch the user's position
    const watchId = Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position, error) => {
        if (error) {
          observer.error('Error watching location: ' + error.message);
        } else if (position) {
          observer.next(position); // Emit the position
          console.log('API GPS modul update', position.coords.altitude);
        }
      }
    );

    // Cleanup logic for when the observable is unsubscribed
    return () => {
      //Geolocation.clearWatch();
    };
  });
}

}
