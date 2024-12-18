import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../common/api.service';
import { Permission } from '../../models/permission';
import { PaginationData } from '../../models/common';
import { API_URL_CONST } from '../../utils/api-url-const';
import { Observable } from 'rxjs';
import { isNullOrEmptyString, isNullOrInvalidNumber } from '../../utils/helper';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private readonly apiUrl = environment.apiUrl;

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
}
