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
            id: 0,
            title: 'John Doe',
            email: 'john.doe@example.com',
            region: 'Asia',
            country: 'Uzbekistan'
          },
          {
            id: 1,
            title: 'Jane Smith',
            email: 'jane.smith@example.com',
            region: 'Asia',
            country: 'Uzbekistan'
          },
          {
            id: 2,
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
            id: 3,
            title: 'Emily Davis',
            email: 'emily.davis@example.com',
            region: 'Africa',
            country: 'Congo (the Democratic Republic of the)'
          },
          {
            id: 4,
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
            id: 5,
            title: 'Sophia Gonzalez',
            email: 'sophia.gonzalez@example.com',
            region: 'Asia',
            country: 'Malaysia'
          },
          {
            id: 6,
            title: 'Liam Fernandez',
            email: 'liam.fernandez@example.com',
            region: 'Africa',
            country: 'Egypt'
          },
          {
            id: 7,
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
        id: 0,
        title: 'John Doe',
        email: 'john.doe@example.com',
        region: 'Asia',
        country: 'Uzbekistan'
      },
      {
        id: 1,
        title: 'Jane Smith',
        email: 'jane.smith@example.com',
        region: 'Asia',
        country: 'Uzbekistan'
      },
      {
        id: 2,
        title: 'Michael Johnson',
        email: 'michael.johnson@example.com',
        region: 'Asia',
        country: 'Singapore'
      },
      {
        id: 3,
        title: 'Emily Davis',
        email: 'emily.davis@example.com',
        region: 'Africa',
        country: 'Congo (the Democratic Republic of the)'
      },
      {
        id: 4,
        title: 'David Lee',
        email: 'david.lee@example.com',
        region: 'Africa',
        country: 'Congo (the Democratic Republic of the)'
      },
      {
        id: 5,
        title: 'Sophia Gonzalez',
        email: 'sophia.gonzalez@example.com',
        region: 'Asia',
        country: 'Malaysia'
      },
      {
        id: 6,
        title: 'Liam Fernandez',
        email: 'liam.fernandez@example.com',
        region: 'Africa',
        country: 'Egypt'
      },
      {
        id: 7,
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
   * Adds the passed customer details into the database of stored customers if value is not present else updated it.
   * @param newCustomerDetails new added customer
   */
  upsertCustomer(newCustomerDetails: CustomerData) {
    let existInDatabase = this.customerDetails.findIndex(c => c.id === newCustomerDetails.id);
    console.log(existInDatabase)
    if (existInDatabase !== -1) {
      this.customerDetails[existInDatabase] = newCustomerDetails;
      this.updatePin(newCustomerDetails);
    }
    else {
      newCustomerDetails.id = this.customerDetails.length + 1;
      console.log(newCustomerDetails)
      this.customerDetails.unshift(newCustomerDetails);
    }
    this.persistData();
    return of<boolean>(true);
  }

  updatePin(newDetails: CustomerData) {
    let tempData = this.pinDetails;
    tempData.forEach(pins => {
      pins.collaborators.forEach((collaborators, index) => {
        if (collaborators.id === newDetails.id) {
          pins.collaborators[index] = newDetails;
        }
      });
    });
    this.pinDetails = tempData;
  }

  persistData() {
    sessionStorage.setItem('data', JSON.stringify({ pinDetails: this.pinDetails, customerDetails: this.customerDetails }));
  }
}
