import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../../app/models/user';
import { API_URL_CONST } from '../../../app/utils/api-url-const';
import { ApiService } from '../common/api.service';
import { environment } from '../../../environments/environment';
import { LoginResponse, LoginRequest } from '../../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]>  = this.usersSubject.asObservable();

  constructor(
    private readonly _apiService: ApiService,
  ) { }

  createUser(user: User): Observable<User> {
    return this._apiService.post<User>(`${this.apiUrl}${API_URL_CONST.REGISTER}`, user);
  }

  loginAuth(user: LoginRequest): Observable<LoginResponse> {
    return this._apiService.post<LoginResponse>(`${this.apiUrl}${API_URL_CONST.LOGIN}`, user);
  }
}
