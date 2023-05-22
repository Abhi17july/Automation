import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Part } from './store';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private partUrl = 'http://localhost:8080/pc/parts';

  constructor(private http: HttpClient) { }

  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(this.partUrl);
  }
}