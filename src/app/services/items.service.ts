import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Item } from '../models';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  constructor(private router: Router, private http: HttpClient) {}

  getItems() {
    return this.http.get<Array<Item>>(`${environment.apiUrl}/items`);
  }

  createItem(data: FormData) {
    return this.http.post<Item>(`${environment.apiUrl}/items`, data);
  }

  getItemById(id: number) {
    return this.http.get<Item>(`${environment.apiUrl}/items/${id}`);
  }

  editItem(data: FormData, itemId: number) {
    return this.http.put<Item>(`${environment.apiUrl}/items/${itemId}`, data);
  }

  deleteItem(itemId: number) {
    return this.http.delete<Item>(`${environment.apiUrl}/items/${itemId}`);
  }
}
