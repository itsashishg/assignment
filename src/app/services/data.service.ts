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
    this.checkForStoredData();
  }

  checkForStoredData() {
    let storedValues = sessionStorage.getItem('data');
    if (storedValues) {
      this.pinDetails = JSON.parse(storedValues).pinDetails;
      this.customerDetails = JSON.parse(storedValues).customerDetails;
    }
  }

  /**
   * To insert mock data in the beginning of the application.
   */
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
    this.persistData();
    return of<boolean>(true);
  }

  /**
   * To fetch lasted values of pin.
   * @returns stored Pin details
   */
  getTableData() {
    return of<PinData[]>(this.pinDetails)
  };

  /**
   * To fetch data for regions and countries.
   * @returns List of countries with there region
   */
  getRegionAndCountryData() {
    return this.http.get<RegionDataResponse>(`https://api.first.org/data/v1/countries`);
  }

  /**
   * To fetch customer details.
   * @returns stored customer details
   */
  getCustomerDetails() {
    return of<CustomerData[]>(this.customerDetails);
  }

  /**
   * Adds the passed pin into the database of stored pins.
   * @param newPin new added pin
   */
  addPin(newPin: PinData) {
    this.pinDetails.unshift(newPin);
    this.persistData();
  }

  /**
   * Adds the passed customer details into the database of stored customers.
   * @param newCustomer new added customer
   */
  addCustomer(newCustomer: CustomerData) {
    this.customerDetails.unshift(newCustomer);
    this.persistData();
  }

  persistData() {
    sessionStorage.setItem('data', JSON.stringify({ pinDetails: this.pinDetails, customerDetails: this.customerDetails }));
  }
}
