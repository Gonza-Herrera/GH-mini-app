import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User, Post } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  listUsers() {
    return this.http.get<User[]>(`${this.api}/users`);
  }
  lastPostsByUser(userId: number) {
    return this.http.get<Post[]>(`${this.api}/posts`, {
      params: {
        userId,
        _limit: 5,
        _sort: 'id',
        _order: 'desc',
      } as any,
    });
  }
}
