import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CustomerData, PinData, RegionDataResponse } from '../components/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private customerDetails: CustomerData[] = [];
  private pinDetails: PinData[] = [];

  constructor(private http: HttpClient) {
    this.insertMockData();
  }

  insertMockData() {
    this.pinDetails = [
      {
        title: 'Stunning Landscape',
        imageURL: 'https://example.com/image1.jpg',
        collaborators: [
          {
            title: 'John Doe',
            email: 'john.doe@example.com',
            region: 'Asia',
            country: 'Uzbekistan'
          },
          {
            title: 'Jane Smith',
            email: 'jane.smith@example.com',
            region: 'Asia',
            country: 'Uzbekistan'
          },
          {
            title: 'Michael Johnson',
            email: 'michael.johnson@example.com',
            region: 'Asia',
            country: 'Singapore'
          }
        ],
        privacy: 'public'
      },
      {
        title: 'Cozy Cabin Retreat',
        imageURL: 'https://example.com/image2.jpg',
        collaborators: [
          {
            title: 'Emily Davis',
            email: 'emily.davis@example.com',
            region: 'Africa',
            country: 'Congo (the Democratic Republic of the)'
          },
          {
            title: 'David Lee',
            email: 'david.lee@example.com',
            region: 'Africa',
            country: 'Congo (the Democratic Republic of the)'
          }
        ],
        privacy: 'private'
      },
      {
        title: 'Vibrant City Skyline',
        imageURL: 'https://example.com/image3.jpg',
        collaborators: [
          {
            title: 'Sophia Gonzalez',
            email: 'sophia.gonzalez@example.com',
            region: 'Asia',
            country: 'Malaysia'
          },
          {
            title: 'Liam Fernandez',
            email: 'liam.fernandez@example.com',
            region: 'Africa',
            country: 'Egypt'
          },
          {
            title: 'Isabella Oliveira',
            email: 'isabella.oliveira@example.com',
            region: 'Central America',
            country: 'Belize'
          }
        ],
        privacy: 'public'
      }
    ];

    this.customerDetails = [
      {
        title: 'John Doe',
        email: 'john.doe@example.com',
        region: 'Asia',
        country: 'Uzbekistan'
      },
      {
        title: 'Jane Smith',
        email: 'jane.smith@example.com',
        region: 'Asia',
        country: 'Uzbekistan'
      },
      {
        title: 'Michael Johnson',
        email: 'michael.johnson@example.com',
        region: 'Asia',
        country: 'Singapore'
      },
      {
        title: 'Emily Davis',
        email: 'emily.davis@example.com',
        region: 'Africa',
        country: 'Congo (the Democratic Republic of the)'
      },
      {
        title: 'David Lee',
        email: 'david.lee@example.com',
        region: 'Africa',
        country: 'Congo (the Democratic Republic of the)'
      },
      {
        title: 'Sophia Gonzalez',
        email: 'sophia.gonzalez@example.com',
        region: 'Asia',
        country: 'Malaysia'
      },
      {
        title: 'Liam Fernandez',
        email: 'liam.fernandez@example.com',
        region: 'Africa',
        country: 'Egypt'
      },
      {
        title: 'Isabella Oliveira',
        email: 'isabella.oliveira@example.com',
        region: 'Central America',
        country: 'Belize'
      }
    ];
  }

  // Mocks API call to fetch data.
  getTableData() {
    return of<PinData[]>(this.pinDetails)
  };

  getRegionAndCountryData() {
    return this.http.get<RegionDataResponse>(`https://api.first.org/data/v1/countries`);
  }

  getCustomerDetails() {
    return of<CustomerData[]>(this.customerDetails);
  }

  addPin(newPin: PinData) {
    this.pinDetails.unshift(newPin);
  }
}
