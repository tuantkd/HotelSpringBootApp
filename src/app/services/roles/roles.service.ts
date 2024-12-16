import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../common/api.service';
import { PaginationRoles, Role } from '../../models/role';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL_CONST } from '../../utils/api-url-const';
import { isNullOrEmptyString, isNullOrInvalidNumber } from '../../utils/helper';
import { ResponseMessage } from '../../models/response-message';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private readonly apiUrl = environment.apiUrl;
  roleModalSubject = new BehaviorSubject<Role>({});

  constructor(private readonly _apiService: ApiService) {}

  getAll(
    pageIndex?: number,
    pageSize?: number,
    sortField?: string,
    sortOrder?: string
  ): Observable<PaginationRoles> {
    let urlApi = `${this.apiUrl}${API_URL_CONST.GET_ROLES}?page=${pageIndex}`;

    if (!isNullOrInvalidNumber(pageSize)) {
      urlApi += `&pageSize=${pageSize}`;
    }

    if (!isNullOrEmptyString(sortField)) {
      urlApi += `&sortField=${sortField}`;
    }

    if (!isNullOrEmptyString(sortOrder)) {
      urlApi += `&sortOrder=${sortOrder}`;
    }

    return this._apiService.get<PaginationRoles>(urlApi);
  }

  createRole(role: Role): Observable<Role> {
    return this._apiService.post<Role>(`${this.apiUrl}${API_URL_CONST.CREATE_ROLE}`, role);
  }

  deleteRole(id: number): Observable<any> {
    return this._apiService.delete<ResponseMessage>(`${this.apiUrl}${API_URL_CONST.DELETE_ROLE}/${id}`);
  }

  setRoleModalSubject(roleModal: Role) {
    this.roleModalSubject.next(roleModal);
  }
}
