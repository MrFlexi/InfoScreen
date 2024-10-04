// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { Dataset } from '../models/dataset.model';  // Import the dataset interface
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private fileName = 'datasets.json';
  public datasets: Dataset[] = [];

  constructor() {
    this.loadDatasets();
  }


  // Load datasets from filesystem
  async loadDatasets() {
    try {
      const result = await Filesystem.readFile({
        path: this.fileName,
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });

      // Check if result.data is a Blob and convert it to string
      let fileData: string;

      if (typeof result.data === 'string') {
        // If it's already a string, just use it
        fileData = result.data;
      } else if (result.data instanceof Blob) {
        // Convert Blob to string
        fileData = await this.blobToString(result.data);
      } else {
        throw new Error('Unexpected data format');
      }
      
      this.datasets = JSON.parse(fileData);
      console.log('Data loaded from filesystem');
    } catch (error) {
      console.log('No file found or unable to load file. Initializing with empty array');
      this.datasets = [];  // Initialize with empty array if file is not found
    }
  }

  async addDataset(dataset: Dataset): Promise<void> {
    this.datasets.push(dataset);
    this.saveDatasets();
  };


  private saveDatasets() {
    Filesystem.writeFile({
      path: this.fileName,
      data: JSON.stringify(this.datasets),
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });
  }

  // Helper function to convert Blob to string
  blobToString(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  }

}

