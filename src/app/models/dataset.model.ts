// src/app/models/dataset.model.ts

export interface ty_Photo {  
  name: string;          // Name or title of the dataset
  description: string;   // Description of the dataset
  picture: string;       // Relative path or URL of the picture
  filepath: string;
  webviewPath?: string;
  createdBy: string;     // The creator of the dataset
  createdAt: string;     // Timestamp of creation (ISO 8601 format)
}


export interface Dataset {
    id: string;            // Unique identifier for the dataset
    name: string;          // Name or title of the dataset
    description: string;   // Description of the dataset
    picture: string;       // Relative path or URL of the picture
    filepath: string;
    webviewPath?: string;
    createdBy: string;     // The creator of the dataset
    createdAt: string;     // Timestamp of creation (ISO 8601 format)
    photos?: ty_Photo[];
  }
  