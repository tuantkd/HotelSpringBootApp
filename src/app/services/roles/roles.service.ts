import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../common/api.service';
import { Role } from '../../models/role';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL_CONST } from '../../utils/api-url-const';
import { isNullOrEmptyString, isNullOrInvalidNumber } from '../../utils/helper';
import { ResponseMessage } from '../../models/response-message';
import { PaginationData } from '../../models/common';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private readonly apiUrl = environment.apiUrl;
  isRoleHandleSubject$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly _apiService: ApiService) {}

  getAll(
    pageIndex?: number,
    pageSize?: number,
    sortField?: string,
    sortOrder?: string
  ): Observable<PaginationData<Role>> {
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

    return this._apiService.get<PaginationData<Role>>(urlApi);
  }

  createRole(role: Role): Observable<Role> {
    return this._apiService.post<Role>(`${this.apiUrl}${API_URL_CONST.CREATE_ROLE}`, role);
  }

  updateRole(role: Role): Observable<Role> {
    return this._apiService.post<Role>(`${this.apiUrl}${API_URL_CONST.UPDATE_ROLE}`, role);
  }

  deleteRole(id: number): Observable<ResponseMessage> {
    return this._apiService.delete<ResponseMessage>(`${this.apiUrl}${API_URL_CONST.DELETE_ROLE}/${id}`);
  }

  findRoleById(id: number): Observable<Role> {
    return this._apiService.get<Role>(`${this.apiUrl}${API_URL_CONST.FIND_ROLE}/${id}`);
  }

  setIsRoleHandleSubject(isEdit: boolean) {
    this.isRoleHandleSubject$.next(isEdit);
  }
}
