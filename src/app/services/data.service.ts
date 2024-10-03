// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private fileName = 'datasets.json';

  constructor() { }

  async loadDatasets(): Promise<any[]> {
    try {
      const result = await Filesystem.readFile({
        path: this.fileName,
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });
      return JSON.parse(result.data);
    } catch (e) {
      console.error('Error reading datasets', e);
      return [];
    }
  }

  async saveDatasets(datasets: any[]): Promise<void> {
    await Filesystem.writeFile({
      path: this.fileName,
      data: JSON.stringify(datasets),
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });
  }
}
