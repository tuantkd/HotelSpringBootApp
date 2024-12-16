import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DemoFlexyModule } from '../../demo-flexy.module';
import { PaginationRoles, Role } from '../../models/role';
import { MatSort } from '@angular/material/sort';
import { RolesService } from '../../services/roles/roles.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from './add/add-role/add-role.component';
import { DIALOG_CONST } from '../../utils/dialog';
import { Subscription } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [DemoFlexyModule, DemoNgZorroAntdModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource = new MatTableDataSource<Role>([]);
  totalAll: number = 0;
  totalPages: number = 0;
  pageSize: FormControl = new FormControl(10);
  pageSizeOptions: Array<number> = [5, 10, 20, 50];
  currentPage: number = 0;
  currentSort: string = 'id';
  currentDirection: string = 'asc';

  @ViewChild(MatSort) sort!: MatSort;

  private readonly subscriptions: Subscription = new Subscription();

  constructor(
    private readonly _rolesService: RolesService,
    public _dialog: MatDialog,
    private readonly _modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this._rolesService.roleModalSubject.subscribe((data) => {
        this.loadRoles();
      })
    );
    this.pageSize.valueChanges.subscribe(value => {
      this.onPageSizeChange();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    this.sort.sortChange.subscribe((sort) => {
      this.currentSort = sort.active;
      this.currentDirection = sort.direction;
      this.loadRoles();
    });
  }

  loadRoles(): void {
    this._rolesService
      .getAll(
        this.currentPage,
        this.pageSize.value,
        this.currentSort,
        this.currentDirection
      )
      .subscribe((response: PaginationRoles) => {
        this.dataSource.data = response.roles as Array<Role>;
        this.totalAll = Number(response.totalAll);
        this.totalPages =  Number(response.totalPages);
      });
  }

  addRole(): void {
    this._dialog.open(AddRoleComponent, {
      width: '600px',
      data: DIALOG_CONST.OPEN,
    });
  }

  deleteRole(id: number): void {
    this._modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want delete?',
      nzOkText: 'Okie',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this._rolesService.deleteRole(id).subscribe((data) => {
          this.loadRoles();
        });
      },
    });
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadRoles();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 0;
    this.loadRoles();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
