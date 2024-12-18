import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EditModal } from '../../../models/common';
import { Permission } from '../../../models/permission';
import { PermissionsService } from '../../../services/permissions/permissions.service';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrl: './add-permission.component.scss',
})
export class AddPermissionComponent {
  permissionForm!: FormGroup;

  title: string = 'Add Permission';
  action: string = 'Add';

  constructor(
    private readonly fb: FormBuilder,
    private readonly _permissionsService: PermissionsService,
    private readonly _message: NzMessageService,
    public _dialogRef: MatDialogRef<AddPermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPermission: EditModal<Permission>
  ) {}

  ngOnInit(): void {
    this.permissionForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.setDataToModal();
  }

  setDataToModal(): void {
    // Set value modal edit
    if (this.dataPermission) {
      this.title = this.dataPermission.title;
      this.action = this.dataPermission.action;
      this.permissionForm
        .get('name')
        ?.setValue(this.dataPermission?.data?.name);
      this.permissionForm.get('name')?.disable();
      this.permissionForm
        .get('description')
        ?.setValue(this.dataPermission?.data?.description);
    }
  }

  onSubmit(): void {
    const input = this.permissionForm.value as Permission;
    if (this.dataPermission?.data?.id) {
      this.updatePermission(this.dataPermission?.data?.id, input);
    } else {
      this.createPermission(input);
    }
  }

  updatePermission(id: number, input?: Permission): void {
    // Update by Id
    const dataUpdate: Permission = {
      id: id,
      description: input?.description,
    };
    this._permissionsService
      .updatePermission(dataUpdate)
      .subscribe((response) => {
        if (response?.id !== null) {
          this._permissionsService.setIsPermissionHandleSubject(true);
          this._dialogRef.close();
          this._message.success('Update successfully', {
            nzDuration: 3000,
          });
        }
      });
  }

  createPermission(input: Permission): void {
    // Create new
    this._permissionsService.createPermission(input).subscribe((response) => {
      if (response?.id !== null) {
        this._permissionsService.setIsPermissionHandleSubject(true);
        this._dialogRef.close();
        this._message.success('Create successfully', {
          nzDuration: 3000,
        });
      }
    });
  }
}
