import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { NAVIGATE_ROUTE_CONST } from '../../utils/api-url-const';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../../models/login';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/storage/user.service';
import { UserStorage } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const userInput: LoginRequest = this.loginForm.value;
      this._authService.loginAuth(userInput).subscribe({
        next: (res: LoginResponse) => {
          this._message.success('Login successfully', {
            nzDuration: 3000,
          });
          UserService.saveTokenLocalStorage(String(res?.jwtToken));
          this._router.navigateByUrl(NAVIGATE_ROUTE_CONST.HOME);
        },
        error: (err) => console.error(err),
      });
    }
  }

  navigatePage(): void {
    this._router.navigateByUrl(NAVIGATE_ROUTE_CONST.REGISTER);
  }
}
