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
  // data: [] = []
  displayedColumns: string[] = ['title', 'imageURL', 'collaborators', 'privacy'];
  dataSource: MatTableDataSource<PinData> = new MatTableDataSource<PinData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private service: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchData() {
    this.service.getTableData().subscribe({
      next: (res) => {
        this.dataSource.data = res;
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

  openCustomer(customerDetails: CustomerData | null) {
    this.dialog.open(CustomerComponent, { data: customerDetails, minWidth: '40%' });
  }

  openPin() {
    this.dialog.open(PinComponent, { minWidth: '40%' }).afterClosed().subscribe(() => this.fetchData());
  }
}
