import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PinData, RegionDataResponse } from '../components/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

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

  getRegionAndCountryData() {
    return this.http.get<RegionDataResponse>(`https://api.first.org/data/v1/countries`);
  }
}
