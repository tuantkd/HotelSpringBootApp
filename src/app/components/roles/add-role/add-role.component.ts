import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolesService } from '../../../services/roles/roles.service';
import { EditRoleModal, Role } from '../../../models/role';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss',
})
export class AddRoleComponent implements OnInit {
  roleForm!: FormGroup;

  title: string = "Add Role";
  action: string = "Add";

  constructor(
    private readonly fb: FormBuilder,
    private readonly _rolesService: RolesService,
    private readonly _message: NzMessageService,
    public _dialogRef: MatDialogRef<AddRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public dataRole: EditRoleModal
  ) {}

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.editRoleModal();
  }

  editRoleModal(): void {
    // Set value modal edit role
    this.title = this.dataRole.title;
    this.action = this.dataRole.action;
    this.roleForm.get('name')?.setValue(this.dataRole?.role?.name);
    this.roleForm.get('name')?.disable();
    this.roleForm.get('description')?.setValue(this.dataRole?.role?.description);
  }

  onSubmit(): void {
    const roleInput = this.roleForm.value as Role;
    if (this.dataRole?.role?.id) {
      this.updateRole(this.dataRole?.role?.id, roleInput);
    } else {
      this.createRoleNew(roleInput);
    }
  }

  updateRole(id: number, roleInput?: Role): void {
    // Update role by Id
    const dataUpdate: Role = {
      id: id,
      description: roleInput?.description
    }
    this._rolesService.updateRole(dataUpdate).subscribe((response) => {
      if (response?.id !== null) {
        this._rolesService.setIsRoleHandleSubject(true);
        this._dialogRef.close();
        this._message.success('Update successfully', {
          nzDuration: 3000,
        });
      }
    });
  }

  createRoleNew(roleInput: Role): void {
    // Create new role
    this._rolesService.createRole(roleInput).subscribe((response) => {
      if (response?.id !== null) {
        this._rolesService.setIsRoleHandleSubject(true);
        this._dialogRef.close();
        this._message.success('Create successfully', {
          nzDuration: 3000,
        });
      }
    });
  }
}
