import {Injectable} from '@angular/core';
import {User} from '../interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  getProfile(): Observable<User> {
    return this.http.get<User>('/api/profile');
  }
  updateProfile(image: File): Observable<User> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    return this.http.patch<User>('/api/profile', fd);
  }
}
