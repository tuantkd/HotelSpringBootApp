import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  HeaderTableCommon,
  PageSizeChange,
  SortByChange,
} from '../table-common/table-common.component';
import { Permission } from '../../models/permission';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PermissionsService } from '../../services/permissions/permissions.service';
import { EditModal, PaginationData } from '../../models/common';
import { AddPermissionComponent } from './add-permission/add-permission.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit, AfterViewInit {
  @ViewChild('actionsCell') actionsCell!: TemplateRef<any>;
  displayedColumns: HeaderTableCommon[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'actions', label: 'Actions', template: this.actionsCell },
  ];
  dataSource: Array<Permission> = [];
  totalAll: number = 0;
  totalPages: number = 0;
  pageSize: FormControl = new FormControl(10);
  pageSizeOptions: Array<number> = [5, 10, 20, 50];
  currentPage: number = 0;
  currentSort: string = 'id';
  currentDirection: string = 'asc';

  private readonly subscriptions: Subscription = new Subscription();

  constructor(
    public _dialog: MatDialog,
    private readonly _permissionsService: PermissionsService,
    private readonly _modalService: NzModalService,
    private readonly _message: NzMessageService,
  ) {}

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this._permissionsService.isPermissionHandleSubject$.subscribe((data) => {
        if (data) {
          this.loadPermissions();
        }
      })
    );
    this.displayedColumns = this.displayedColumns.map((col) =>
      col.key === 'actions' ? { ...col, template: this.actionsCell } : col
    );
  }

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.subscriptions.add(
      this._permissionsService
        .getAll(
          this.currentPage,
          this.pageSize.value,
          this.currentSort,
          this.currentDirection
        )
        .subscribe((response: PaginationData<Permission>) => {
          this.dataSource = response?.data ?? ([] as Array<Permission>);
          this.totalAll = Number(response.totalAll);
          this.totalPages = Number(response.totalPages);
        })
    );
  }

  openModal(data?: any): void {
    this._dialog.open(AddPermissionComponent, {
      width: '600px',
      data: data,
    });
    this._permissionsService.setIsPermissionHandleSubject(false);
  }

  editRole(id: number): void {
    this._permissionsService.findPermissionById(id).subscribe((data) => {
      const editRole: EditModal<Permission> = {
        title: 'Edit Permission',
        action: 'Update',
        data: data,
      };
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
        this._permissionsService.deletePermission(id).subscribe((data) => {
          this._message.success('Delete successfully', {
            nzDuration: 3000,
          });
          this.loadPermissions();
        });
      },
    });
  }

  onCurrentPageChange(page: number): void {
    this.currentPage = page;
    this.loadPermissions();
  }

  onPageSizeChange(page: PageSizeChange): void {
    this.currentPage = page.page;
    this.pageSize.setValue(page.pageSize);
    this.loadPermissions();
  }

  onSortChange(sort: SortByChange): void {
    this.currentSort = sort.currentSort;
    this.currentDirection = sort.currentDirection;
    this.loadPermissions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
