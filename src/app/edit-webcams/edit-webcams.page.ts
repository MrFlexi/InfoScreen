import { Component, OnInit } from '@angular/core';
import { WebcamService } from '../services/webcam.service';
import { ty_Webcam } from '../models/dataset.model';

@Component({
  selector: 'app-edit-webcams',
  templateUrl: './edit-webcams.page.html',
  styleUrls: ['./edit-webcams.page.scss'],
})
export class EditWebcamsPage implements OnInit {

  constructor(public webcamService: WebcamService) {}

  ngOnInit() {  
    
    
    
  }
  
}
