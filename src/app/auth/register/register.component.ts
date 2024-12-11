import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NAVIGATE_ROUTE_CONST } from '../../utils/api-url-const';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private readonly _authService: AuthService,
    private readonly _message: NzMessageService,
    private readonly _router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  get username() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value as User;
      this._authService.createUser(user).subscribe({
        next: (user: User) => {
          this._message.success('User created successfully', {
            nzDuration: 3000
          });
          
          if (user?.id !== null) {
            this.registerForm.reset();
          }
        },
        error: (err) => console.error(err),
      });
    }
  }

  navigatePage(): void {
    this._router.navigateByUrl(NAVIGATE_ROUTE_CONST.LOGIN);
  }
}
