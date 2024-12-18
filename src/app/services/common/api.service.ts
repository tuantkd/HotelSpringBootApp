import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { catchError, finalize, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly http: HttpClient, 
    private readonly loadingService: LoadingService, 
    private readonly _message: NzMessageService
  ) {}

  get<T>(url: string) {
    this.loadingService.setLoading(true);
    return this.http.get<T>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  post<T>(url: string, body: any) {
    this.loadingService.setLoading(true);
    return this.http.post<T>(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  put<T>(url: string, body: any) {
    this.loadingService.setLoading(true);
    return this.http.put<T>(url, body).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  delete<T>(url: string) {
    this.loadingService.setLoading(true);
    return this.http.delete<T>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      }),
      finalize(() => this.loadingService.setLoading(false))
    );
  }

  private handleError(error: HttpErrorResponse): any {
    const message = error.error?.message ?? 'An error occurred';
    this._message.error(message, {
      nzDuration: 3000
    });
    return throwError(error);
  }
}
