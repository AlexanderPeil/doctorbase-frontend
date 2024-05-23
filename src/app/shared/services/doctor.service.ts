import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Doctor } from '../models/doctor';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctorSubject = new BehaviorSubject<Doctor[]>([]);
  public doctors$ = this.doctorSubject.asObservable();

  constructor(private http: HttpClient) { }


  getDoctors(): void {
    const url = `${environment.baseUrl}/doctors/`;
    this.http.get<Doctor[]>(url).pipe(take(1)).subscribe(
      doctors => {
        this.doctorSubject.next(doctors);
      },
      error => {
        console.error(error);
      }
    )
  }


  getDoctorById(id: number):Observable<Doctor> {
    const url = `${environment.baseUrl}/doctors/`;
    return this.http.get<Doctor>(url);
  }
}
