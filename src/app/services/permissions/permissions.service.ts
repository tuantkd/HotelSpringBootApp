import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../common/api.service';
import { Permission } from '../../models/permission';
import { PaginationData } from '../../models/common';
import { API_URL_CONST } from '../../utils/api-url-const';
import { BehaviorSubject, Observable } from 'rxjs';
import { isNullOrEmptyString, isNullOrInvalidNumber } from '../../utils/helper';
import { ResponseMessage } from '../../models/response-message';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private readonly apiUrl = environment.apiUrl;
  isPermissionHandleSubject$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly _apiService: ApiService) {}

  getAll(
    pageIndex?: number,
    pageSize?: number,
    sortField?: string,
    sortOrder?: string
  ): Observable<PaginationData<Permission>> {
    let urlApi = `${this.apiUrl}${API_URL_CONST.GET_PERMISSIONS}?page=${pageIndex}`;

    if (!isNullOrInvalidNumber(pageSize)) {
      urlApi += `&pageSize=${pageSize}`;
    }

    if (!isNullOrEmptyString(sortField)) {
      urlApi += `&sortField=${sortField}`;
    }

    if (!isNullOrEmptyString(sortOrder)) {
      urlApi += `&sortOrder=${sortOrder}`;
    }

    return this._apiService.get<PaginationData<Permission>>(urlApi);
  }

  createPermission(body: Permission): Observable<Permission> {
    return this._apiService.post<Permission>(
      `${this.apiUrl}${API_URL_CONST.CREATE_PERMISSION}`,
      body
    );
  }

  updatePermission(body: Permission): Observable<Permission> {
    return this._apiService.post<Permission>(
      `${this.apiUrl}${API_URL_CONST.UPDATE_PERMISSION}`,
      body
    );
  }

  deletePermission(id: number): Observable<ResponseMessage> {
    return this._apiService.delete<ResponseMessage>(
      `${this.apiUrl}${API_URL_CONST.DELETE_PERMISSION}/${id}`
    );
  }

  findPermissionById(id: number): Observable<Permission> {
    return this._apiService.get<Permission>(
      `${this.apiUrl}${API_URL_CONST.FIND_PERMISSION}/${id}`
    );
  }

  setIsPermissionHandleSubject(isEdit: boolean) {
    this.isPermissionHandleSubject$.next(isEdit);
  }
}
