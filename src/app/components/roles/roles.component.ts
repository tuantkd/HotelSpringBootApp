import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DemoFlexyModule } from '../../demo-flexy.module';
import { EditRoleModal, PaginationRoles, Role } from '../../models/role';
import { MatSort } from '@angular/material/sort';
import { RolesService } from '../../services/roles/roles.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from './add/add-role/add-role.component';
import { Subscription } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderTableCommon, PageSizeChange, SortByChange, TableCommonComponent } from '../table-common/table-common.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [DemoFlexyModule, DemoNgZorroAntdModule, CommonModule, FormsModule, ReactiveFormsModule, TableCommonComponent],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  @ViewChild('actionsCell') actionsCell!: TemplateRef<any>;
  displayedColumns: HeaderTableCommon[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'actions', label: 'Actions', template: this.actionsCell },
  ];
  dataSource: Array<Role> = [];
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
      this._rolesService.roleModalSubject$.subscribe((data) => {
        this.loadRoles();
      })
    );
  }

  ngAfterViewInit() {
    this.displayedColumns = this.displayedColumns.map((col) =>
      col.key === 'actions' ? { ...col, template: this.actionsCell } : col
    );
  }

  onEdit(element: any): void {
    console.log('Edit:', element);
  }

  onDelete(element: any): void {
    console.log('Delete:', element);
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
        this.dataSource = response.roles as Array<Role>;
        this.totalAll = Number(response.totalAll);
        this.totalPages =  Number(response.totalPages);
      });
  }

  openModal(data?: EditRoleModal): void {
    this._dialog.open(AddRoleComponent, {
      width: '600px',
      data: data
    });
  }

  editRole(id: number): void {
    this._rolesService.findRoleById(id).subscribe(data => {
      const editRole: EditRoleModal = {
        title: 'Edit role',
        action: 'Update',
        role: data
      }
      this.openModal(editRole);
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

  onCurrentPageChange(page: number): void {
    this.currentPage = page;
    this.loadRoles();
  }

  onPageSizeChange(page: PageSizeChange): void {
    this.currentPage = page.page;
    this.pageSize.setValue(page.pageSize);
    this.loadRoles();
  }

  onSortChange(sort: SortByChange): void {
    this.currentSort = sort.currentSort;
    this.currentDirection = sort.currentDirection;
    this.loadRoles();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
