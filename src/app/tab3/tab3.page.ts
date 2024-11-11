import { Component } from '@angular/core';
import { WebcamService } from '../services/webcam.service';
import { DataService } from '../services/data.service';
import { GeolocationService } from '../services/geolocation.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
  private locationLayerGroup = new Leaflet.LayerGroup();
  private trackLayerGroup = new Leaflet.LayerGroup();
  private speedControl = new Leaflet.Control({ position: 'topright' });  // Leaflet control to display speed


  private subscriptions: Subscription[] = [];


  constructor(public geoLocation: GeolocationService,
    public dataService: DataService) {

  }

  ngOnInit() { }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
  }

  ionViewDidEnter() {
    if (this.map) {
      this.map.remove(); // Clean up the existing map instance
    }

    this.leafletInit();
    this.subscriptions.push(
      // Subscribe on GPS position updates
      this.geoLocation.geoTicker.subscribe((next) => {
        console.log('GPS subscribed');
        this.updateGpsMapPosition();
      })
    );
  }

  ionViewWillLeave() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    console.log('unsubscribed');
  }

  ionViewDidLeave() {
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
      div.innerHTML = `<b>Speed: </b><span id="speed">0 km/h</span>`;
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


  leafletSetBottle(position: any, layer: Leaflet.LayerGroup) {
    if (this.map) {
      console.log('Map Position updated');
      const that = this;

      // Add in a crosshair for the map
      const bottleIcon = Leaflet.icon({
        iconUrl: '../../../../assets/icon/bottle.png',
        iconSize: [20, 20], // size of the icon
        iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
      });
      const bottle = Leaflet.marker(position, { icon: bottleIcon });
      this.trackLayerGroup.addLayer(bottle);
      //this.map.addLayer(layer);
    }
    else console.log('Map not defined');
  }



  leafletSetCrosshair(position: any) {
    if (this.map) {
      const that = this;
      console.log('Map Crosshair updated', position);
      this.map.setView(position, 16);
      const markerCircle = Leaflet.circleMarker(position, {
        color: 'orange',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: 20
      });
      markerCircle.setRadius(40);
      this.map.addLayer(markerCircle);
      //this.map.on('move', function (e) {
      //  markerCircle.setLatLng(that.map.getCenter());
      //});
    }
    else console.log('Map not defined');
  }


  updateGpsMapPosition() {
    if (this.geoLocation.latitude) {
      const position = new Leaflet.LatLng(this.geoLocation.latitude, this.geoLocation.longitude);
      //this.leafletSetCrosshair(position);
      //if (this.checkboxTrack)
      //{
      this.leafletSetMarkerOnPosition();
      //}

    }
    else { console.log("NO GPS") }
  }


  leafletCenterOnPosition() {
    if (this.geoLocation.latitude) {
      const position = new Leaflet.LatLng(this.geoLocation.latitude, this.geoLocation.longitude);
      console.log('center on position');
      if (this.map) {
        this.map.setView(position, 16);
        this.leafletSetBottle(position, this.trackLayerGroup)
      }
      else console.log('Map not defined');
    }
    else 
    { 
      console.log('No GPS info available');
      this.geoLocation.showToast("No GPS info available") 
    }
  }


  leafletSetMarkerOnPosition() {
    const position = new Leaflet.LatLng(this.geoLocation.latitude, this.geoLocation.longitude);
    console.log('set marker');
    if (this.map) {
      //this.map.setView(position, 16);
      this.leafletSetBottle(position, this.trackLayerGroup)
      //var marker = Leaflet.marker(position).addTo(this.map);
      //this.map.addLayer(marker);
    }
    else console.log('Map not defined');
  }

  onMapReady(map: Leaflet.Map) {
    this.map = map;
    console.log('Leaflet Map ready ');
  }


  onSave() {
  }

  onGeoPosUpdate() {
    this.updateGpsMapPosition();
    this.updateSpeedDisplay(this.geoLocation.speed)
  }

  updateSpeedDisplay(speedInKmH: number) {
    const speedElement = document.getElementById('speed');
    if (speedElement) {
      speedElement.innerText = speedInKmH.toFixed(2) + ' km/h';
    }
  }

}
