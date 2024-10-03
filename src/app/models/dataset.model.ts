// src/app/models/dataset.model.ts
export interface Dataset {
    id: string;            // Unique identifier for the dataset
    name: string;          // Name or title of the dataset
    description: string;   // Description of the dataset
    picture: string;       // Relative path or URL of the picture
    createdBy: string;     // The creator of the dataset
    createdAt: string;     // Timestamp of creation (ISO 8601 format)
  }
  