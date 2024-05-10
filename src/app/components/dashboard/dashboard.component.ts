import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PinData } from '../models';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less'
})
export class DashboardComponent implements OnInit {
  data: PinData[] = []

  constructor(private service: DataService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.service.getTableData().subscribe({
      next: (res) => {
        this.data = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
