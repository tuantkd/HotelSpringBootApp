import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DemoFlexyModule } from '../../demo-flexy.module';
import { UserTable } from '../../models/user';
import { CommonModule } from '@angular/common';

const ELEMENT_DATA: UserTable[] = [
  {
    id: 1,
    name: 'Deep Javiya',
    email: 'a@gmail.com',
    roles: ['Frontend Devloper'],
    permissions: ['Flexy Angular'],
  },
  {
    id: 1,
    name: 'Deep Javiya',
    email: 'a@gmail.com',
    roles: ['Frontend Devloper'],
    permissions: ['Flexy Angular'],
  },
  {
    id: 1,
    name: 'Deep Javiya',
    email: 'a@gmail.com',
    roles: ['Frontend Devloper', 'ERHKHD'],
    permissions: ['Flexy Angular'],
  },
  {
    id: 1,
    name: 'Deep Javiya',
    email: 'a@gmail.com',
    roles: ['Frontend Devloper', 'ADDKJD'],
    permissions: ['Flexy Angular'],
  },
  {
    id: 1,
    name: 'Deep Javiya',
    email: 'a@gmail.com',
    roles: ['Frontend Devloper'],
    permissions: ['Flexy Angular'],
  },
];

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [DemoFlexyModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'roles',
    'permissions',
    'action',
  ];

  dataSourceUser = new MatTableDataSource<UserTable>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSourceUser.paginator = this.paginator;
  }
}
