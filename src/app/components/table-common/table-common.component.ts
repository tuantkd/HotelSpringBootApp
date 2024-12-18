import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface HeaderTableCommon {
  key: string;
  label: string;
  template?: TemplateRef<any> | null;
}

export interface PageSizeChange {
  page: number;
  pageSize: number;
}

export interface SortByChange {
  currentSort: string;
  currentDirection: string;
}

@Component({
  selector: 'app-table-common',
  templateUrl: './table-common.component.html',
  styleUrls: ['./table-common.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableCommonComponent),
      multi: true,
    },
  ],
})
export class TableCommonComponent implements AfterViewInit, OnInit {
  pageSize: FormControl = new FormControl(10);
  @Output() pageSizeChange = new EventEmitter<PageSizeChange>();

  pageSizeOptions: Array<number> = [5, 10, 20, 50, 100];

  @Input() currentPage: number = 0;
  @Output() currentPageChange = new EventEmitter<number>();

  @Input() totalPages: number = 0;

  currentSort: string = 'id';
  currentDirection: string = 'asc';
  @Output() sortChange = new EventEmitter<SortByChange>();

  @Input() data: any[] = [];
  @Input() columns: HeaderTableCommon[] = [];
  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatSort) sort!: MatSort;

  get displayedColumns(): string[] {
    return this.columns.map((col) => col.key);
  }

  ngOnInit(): void {
    this.pageSize.valueChanges.subscribe((value) => {
      const data: PageSizeChange = { page: 0, pageSize: value };
      this.pageSizeChange.emit(data);
    });
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPageChange.emit(page);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe((sort) => {
      this.sortChange.emit({
        currentSort: sort.active,
        currentDirection: sort.direction,
      });
    });
  }

  ngOnChanges(): void {
    this.dataSource.data = this.data;
  }
}
