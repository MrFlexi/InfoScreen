import { Component } from '@angular/core';
import { WebcamService } from '../services/webcam.service';
import { DataService } from '../services/data.service';
import { GeolocationService } from '../services/geolocation.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Leaflet from 'leaflet';
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
  private locationLayerGroup = new Leaflet.LayerGroup();
  private trackLayerGroup = new Leaflet.LayerGroup();
  private subscriptions: Subscription[] = [];


  constructor(public geoLocation: GeolocationService,
    public dataService: DataService) {

  }

  ngOnInit() { }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
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
    if (this.map) {
      this.map.remove();
    }
  }

  ionViewDidLeave() {
  }


  updateGpsMapPosition() {
    if (this.geoLocation.latitude) {
      const position = new Leaflet.LatLng(this.geoLocation.latitude, this.geoLocation.longitude);
      this.leafletSetCrosshair(position);
      this.leafletSetMarkerOnPosition();
    }
    else { console.log("NO GPS") }
  }


  leafletInit() {
    const position = new Leaflet.LatLng(48.1365, 11.6825);

    this.map = new Leaflet.Map('geoMap').setView(position, 13);

    const tileLayerOnline = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Online Layer'
    }).addTo(this.map);

    // Listen for the 'moveend' event
    this.map.on('moveend', (event: Leaflet.LeafletEvent) => {      
      var center = this.map.getCenter();
      console.log('Map moved to:',center);      
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

  leafletSetMarkerOnPosition() {
    const position = new Leaflet.LatLng(this.geoLocation.latitude, this.geoLocation.longitude);
    console.log('set marker');
    if (this.map) {
      this.map.setView(position, 16);
      var marker = Leaflet.marker(position).addTo(this.map);
      this.map.addLayer(marker);
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
  }



}
