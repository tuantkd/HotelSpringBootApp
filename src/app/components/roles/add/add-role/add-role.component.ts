import { Component, OnInit } from '@angular/core';
import { DemoFlexyModule } from '../../../../demo-flexy.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RolesService } from '../../../../services/roles/roles.service';
import { Role } from '../../../../models/role';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [DemoFlexyModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss',
})
export class AddRoleComponent implements OnInit {
  roleForm!: FormGroup;

  title: string = "Add Role";
  action: string = "Add";

  constructor(
    private fb: FormBuilder,
    private readonly _rolesService: RolesService,
    private readonly _message: NzMessageService,
    public _dialogRef: MatDialogRef<AddRoleComponent>
  ) {}

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const roleInput = this.roleForm.value as Role;
    this._rolesService.createRole(roleInput).subscribe((response) => {
      if (response?.id !== null) {
        this._rolesService.setRoleModalSubject(response);
        this._dialogRef.close();
        this._message.success('Create successfully', {
          nzDuration: 3000,
        });
      }
    });
  }
}
