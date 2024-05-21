import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Appointment } from '../models/appointment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    const url = `${environment.baseUrl}/appointments/`;
    return this.http.post<Appointment>(url, appointment.toJSON());
  }

}
