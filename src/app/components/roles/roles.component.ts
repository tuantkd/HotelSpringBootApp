import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Role } from '../../models/role';
import { RolesService } from '../../services/roles/roles.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from './add-role/add-role.component';
import { Subscription } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormControl } from '@angular/forms';
import {
  HeaderTableCommon,
  PageSizeChange,
  SortByChange,
} from '../table-common/table-common.component';
import { EditModal, PaginationData } from '../../models/common';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit, AfterViewInit {
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

  private readonly subscriptions: Subscription = new Subscription();

  constructor(
    public _dialog: MatDialog,
    private readonly _rolesService: RolesService,
    private readonly _modalService: NzModalService,
    private readonly _message: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  ngAfterViewInit() {
    this.subscriptions.add(
      this._rolesService.isRoleHandleSubject$.subscribe((data) => {
        if (data) {
          this.loadRoles();
        }
      })
    );
    this.displayedColumns = this.displayedColumns.map((col) =>
      col.key === 'actions' ? { ...col, template: this.actionsCell } : col
    );
  }

  loadRoles(): void {
    this.subscriptions.add(
      this._rolesService
        .getAll(
          this.currentPage,
          this.pageSize.value,
          this.currentSort,
          this.currentDirection
        )
        .subscribe((response: PaginationData<Role>) => {
          this.dataSource = response?.data ?? ([] as Array<Role>);
          this.totalAll = Number(response.totalAll);
          this.totalPages = Number(response.totalPages);
        })
    );
  }

  openModal(data?: EditModal<Role>): void {
    this._dialog.open(AddRoleComponent, {
      width: '600px',
      data: data,
    });
    this._rolesService.setIsRoleHandleSubject(false);
  }

  editRole(id: number): void {
    this._rolesService.findRoleById(id).subscribe((data) => {
      const editRole: EditModal<Role> = {
        title: 'Edit Role',
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
        this._rolesService.deleteRole(id).subscribe((data) => {
          this._message.success('Delete successfully', {
            nzDuration: 3000,
          });
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
