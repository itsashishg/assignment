import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PinData } from '../components/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  // Mocks API call to fetch data.
  getTableData() {
    return of<PinData[]>(
      [
        { title: 'Pin 1', imageURL: '', collaborators: [], privacy: 'private' },
        { title: 'Pin 2', imageURL: '', collaborators: [], privacy: 'public' },
        { title: 'Pin 3', imageURL: '', collaborators: [], privacy: 'private' },
        { title: 'Pin 4', imageURL: '', collaborators: [], privacy: 'public' },
        { title: 'Pin 5', imageURL: '', collaborators: [], privacy: 'private' },
      ]
    )
  };
}
