import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { CustomerData, PinData } from '../models';
import { DataService } from '../../services/data.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CustomerComponent } from '../customer/customer.component';
import { PinComponent } from '../pin/pin.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatChipsModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less'
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['title', 'imageURL', 'collaborators', 'privacy'];
  dataSource: MatTableDataSource<PinData> = new MatTableDataSource<PinData>();
  noDataFound: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // To paginate the table
  @ViewChild(MatSort) sort!: MatSort; // To allow sorting on table
  constructor(private service: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.service.getTableData().subscribe({
      next: (res) => {
        if (!res.length) {
          this.noDataFound = true;
        }
        this.dataSource.data = res;
        // Initializes paginator and sort
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Allows the user to open customer edit/add dialog box.
   */
  openCustomer(customerDetails: CustomerData | null) {
    this.dialog.open(CustomerComponent, { data: customerDetails, panelClass: ['col-12', 'col-sm-12', 'col-md-5'], disableClose: true });
  }

  /**
   * Currently it only allows to add pin.
   */
  openPin() {
    this.dialog.open(PinComponent, { panelClass: ['col-12', 'col-sm-12', 'col-md-5'] }).afterClosed().subscribe(() => this.fetchData());
  }

  insertMockData() {
    this.service.insertMockData().subscribe({
      next: res => {
        this.fetchData();
      }
    });
  }
}
