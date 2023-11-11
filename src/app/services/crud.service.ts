import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private _http: HttpClient) {}

  addData(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/data', data);
  }

  updateData(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/data/${id}`, data);
  }

  getDataList(): Observable<any> {
    return this._http.get('http://localhost:3000/data');
  }

  deleteData(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/data/${id}`);
  }
}
