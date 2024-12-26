import { Component } from '@angular/core';
import { WebcamService } from '../services/webcam.service';
import { DataService } from '../services/data.service';
import { GeolocationService } from '../services/geolocation.service';
import { Position } from '@capacitor/geolocation';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular'
import * as Leaflet from 'leaflet';
import 'leaflet-routing-machine';
import * as L from 'leaflet.offline';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit, OnDestroy {
  map: Leaflet.Map
  layer: Leaflet.Layer
  message = '';
  currentUser = '';
  checkboxTrack: boolean = false;
  checkboxCenterOnPosition: boolean = true;
  checkboxSetTrack: boolean = true;
  private locationLayerGroup = new Leaflet.LayerGroup();
  private trackLayerGroup = new Leaflet.LayerGroup();
  private speedControl = new Leaflet.Control({ position: 'topright' });  // Leaflet control to display speed
  private subscriptions: Subscription[] = [];

  positionCrosshair: any;

  constructor(public geoLocation: GeolocationService,
    public dataService: DataService, private platform: Platform) {

      this.platform.pause.subscribe(() => {
        console.log('App is going to background');
        // Handle app pause, clean up if necessary
      });

      this.platform.resume.subscribe(() => {
        console.log('App is resuming');
        this.restartSubscriptions();
      });

  }

  restartSubscriptions() {
    // Reinitialize subscriptions here
    console.log('Restarting subscriptions...');
    console.log('UI subscribe to GPS');  
    this.subscriptions.push(
      // Subscribe on GPS position updates    
      this.geoLocation.getLocationUpdates().subscribe({
        next: (position: Position) => {
          console.log('UI GPS update received');
          this.updateGpsMapPosition(position);
        },
        error: (error) => {
          console.log('Subscription error');
        },
      })
    );
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnterter');
    if (this.map) {
      this.map.remove(); // Clean up the existing map instance
    }
    this.leafletInit();
    this.restartSubscriptions();
  }

  ionViewWillLeave() {
 
  }

  ionViewDidLeave() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    console.log('UI unsubscribed');
  }



  leafletInit() {
    const position = new Leaflet.LatLng(48.1365, 11.6825);

    this.map = new Leaflet.Map('geoMap').setView(position, 13);

    const tileLayerOnline = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Online Layer'
    }).addTo(this.map);

    //
    //Leaflet.Routing.control({
    //  waypoints: [
    //    Leaflet.latLng(48.00, 11.00),
    //    Leaflet.latLng(47.00, 11.00)
    //  ]
    //}).addTo(this.map);

    // Create a custom control to show the speed
    this.speedControl.onAdd = () => {
      const div = Leaflet.DomUtil.create('div', 'speed-control');
      div.innerHTML = `<b>Alt: </b><span id="alt">0 m</span> <b>Speed: </b><span id="speed">0 km/h</span>`;
      return div;
    };
    this.speedControl.addTo(this.map);

    // Listen for the 'moveend' event
    this.map.on('moveend', (event: Leaflet.LeafletEvent) => {
      var center = this.map.getCenter();
      console.log('Map moved to:', center);
    })

    // offline baselayer, will use offline source if available
    const tileLayerOffline = L.tileLayerOffline('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Offline Layer'
    }).addTo(this.map);

    const control = L.savetiles(tileLayerOffline, {
      zoomlevels: [13, 16], // optional zoomlevels to save, default current zoomlevel
      confirm(layer: any, successCallback: any) {
        // eslint-disable-next-line no-alert
        if (window.confirm(`Save ${layer._tilesforSave.length}`)) {
          successCallback();
        }
      },
      confirmRemoval(layer: any, successCallback: any) {
        // eslint-disable-next-line no-alert
        if (window.confirm('Remove all the tiles?')) {
          successCallback();
        }
      },
      saveText:
        '<i class="fa fa-download" aria-hidden="true" title="Save tiles"></i>',
      rmText: '<i class="fa fa-trash" aria-hidden="true"  title="Remove tiles"></i>',
    });
    control.addTo(this.map);
    this.map.addLayer(this.locationLayerGroup);

    // layer switcher control
    const layerswitcher = new Leaflet.Control.Layers(
      {
        'Carto (online)': tileLayerOnline,
        'Openstreetmap (offline)': tileLayerOffline
      },
      {
        'GPS Position': this.locationLayerGroup,
        'GPS Track': this.trackLayerGroup,
      },
      { collapsed: false }
    ).addTo(this.map);
  }

  leafletSetBottle(position: Leaflet.LatLng, layer: Leaflet.LayerGroup) {
    if (this.map) {
      console.log('Add Icon bottle');
    
      // Add in a crosshair for the map
      const bottleIcon = Leaflet.icon({
        iconUrl: '../../../../assets/icon/bottle.png',
        iconSize: [20, 20], // size of the icon
        iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
      });

      const bottle = Leaflet.marker(position, { icon: bottleIcon }).addTo(layer);
    }
    else console.log('Map not defined');
  }

  leafletSetWayPoint(position: Leaflet.LatLng, layer: Leaflet.LayerGroup) {
    if (this.map) {
      console.log('Add Waypoint');

      const wayPoint = Leaflet.circleMarker(position, {
        color: 'blue',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: 5
      }).addTo(layer);
    }
    else console.log('Map not defined');
  }

  leafletSetCrosshair(position: Leaflet.LatLng) {
    if (this.map) {    
      if( typeof this.positionCrosshair == "undefined")
      {
        console.log('Init Crosshair'); 
      this.positionCrosshair = Leaflet.circleMarker(position, {
        color: 'orange',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: 20
      });
      this.positionCrosshair.setRadius(40).addTo(this.locationLayerGroup)
    } else
    {
      console.log('Crosshair moved to: ',position);
      this.positionCrosshair.setLatLng(position);
    }
    }
    else console.log('Map not defined');
  }

  // -------------------------------------------------------------------------//
  // Is called whenever a new GPS position is received
  // -------------------------------------------------------------------------//
  updateGpsMapPosition(gps_position: Position) {
    var s = new Date(gps_position.timestamp).toLocaleTimeString("de-DE")
    this.geoLocation.showToast("GPS update..." + s)
    if (this.geoLocation.latitude) {
      const position = new Leaflet.LatLng(gps_position.coords.latitude, gps_position.coords.longitude );
      this.updateDisplay(gps_position.coords.speed, gps_position.coords.speed)

      if (this.checkboxCenterOnPosition) {
        console.log('Center on position');
        this.leafletCenterOnPosition(position);
        this.leafletSetCrosshair(position);
      }

      if (this.checkboxSetTrack) {
        "Set a position icon"
        this.leafletSetWayPoint(position, this.trackLayerGroup)
      }

    }
    else { console.log("NO GPS") }
  }


  leafletCenterOnPosition(position: Leaflet.LatLng) {
    if (position) {
      console.log('center on position');
      if (this.map) {
        this.map.setView(position, 16);
      }
      else console.log('Map not defined');
    }
    else {
      console.log('No GPS info available');
      this.geoLocation.showToast("No GPS info available")
    }
  }


  onMapReady(map: Leaflet.Map) {
    this.map = map;
    console.log('Leaflet Map ready ');
  }


  onSave() {
  }

  //
  //onGeoPosUpdate() {
  //  this.updateGpsMapPosition();
  //  this.updateDisplay(this.geoLocation.speed, this.geoLocation.altitude)
 // }

  onBTCenter(){
    if (this.geoLocation.latitude) {
      const position = new Leaflet.LatLng(this.geoLocation.latitude, this.geoLocation.longitude);
        "Center map on position"
      this.leafletCenterOnPosition(position);
  
      this.leafletSetCrosshair(position);
      this.updateDisplay(this.geoLocation.speed, this.geoLocation.altitude)
      
      //const position1 = new Leaflet.LatLng(11.00, 12.00);
      //const position2 = new Leaflet.LatLng(11.01, 12.00);
      //  this.leafletCenterOnPosition(position1);
      //  this.leafletSetWayPoint(position1, this.trackLayerGroup);
      //  this.leafletSetWayPoint(position2, this.trackLayerGroup);
    }
  }

  updateDisplay(speedInKmH: number, alt:number) {
    const speedElement = document.getElementById('speed');
    if (speedElement) {
      speedElement.innerText = speedInKmH.toFixed(2) + ' km/h';
    }
    else console.log("Speed element not found")

    const altElement = document.getElementById('alt');
    if (altElement) {
      altElement.innerText = alt.toFixed(4) + ' m';
    }
    else console.log("Speed element not found")
  }

  leafletBTCenterOnPosition() {
    console.log('FollowMe toggled');
    console.log(this.checkboxCenterOnPosition)
  }

  leafletBTSetTrack() {
    console.log('Track toggled');
    console.log(this.checkboxSetTrack)
  }

}
