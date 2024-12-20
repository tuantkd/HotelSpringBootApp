import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserTable } from '../../models/user';

interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}

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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnInit {

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.listOfData = new Array(200).fill(0).map((_, index) => ({
      id: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`
    }));
  }
}
