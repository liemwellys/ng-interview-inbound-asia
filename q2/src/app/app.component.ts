import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Table } from './components/table/table.component';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../domain/customer';
import { Product } from '../domain/product';

type ApiResponse<T> = {
  data: T[];
  meta: {
    total: number;
  };
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Table],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private readonly http: HttpClient) {}

  customers: Customer[] = [];
  customerColumns = [
    'id',
    'name',
    'country',
    'company',
    'date',
    'status',
    'activity',
    'representative',
    'verified',
    'balance',
  ];

  products: Product[] = [];
  productColumns = [];

  ngOnInit(): void {
    this.http
      .get<ApiResponse<Customer>>('/api/v1/customer')
      .subscribe((data) => {
        this.customers = data.data;
      });

    this.http.get<ApiResponse<Product>>('api/v1/product').subscribe((data) => {
      console.log(data);
      this.products = data.data;
      this.customerColumns = Object.keys(this.products[0]);
    });
  }

  title = 'interview-ng';
}
