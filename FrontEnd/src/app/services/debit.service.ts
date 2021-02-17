import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// const baseUrl = 'http://localhost:53318/api/Debt';
const baseUrl = `${environment.baseUrlApi}:${environment.baseUrlApiPort}/api/Debt`;

@Injectable({
  providedIn: 'root'
})
export class DebitService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getByCuscomer(customerId) {
    return this.http.get(`${baseUrl}/customer/${customerId}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(data) {
    return this.http.put(`${baseUrl}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }
}
