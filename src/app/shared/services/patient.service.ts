import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Patient } from '../models/patient';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { PatientData } from '../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientsSubject = new BehaviorSubject<Patient[]>([]);
  public patients$ = this.patientsSubject.asObservable();


  constructor(private http: HttpClient) { }


  getPatients(): void {
    const url = `${environment.baseUrl}/patients/`;
    this.http.get<Patient[]>(url).pipe(take(1)).subscribe(
      patients => {
        this.patientsSubject.next(patients);
      },
      error => {
        console.error(error)
      }
    );
  }


  getPatientById(id: number) {
    const url = `${environment.baseUrl}/patients/${id}`;
    return this.http.get<Patient>(url)
  }


  createPatient(patientData: PatientData) {
    const url = `${environment.baseUrl}/patients/`;
    return this.http.post<Patient>(url, patientData);
  }


  addPatient(patient: Patient): void {
    this.createPatient(patient).subscribe(
      newPatient => {
        const currentPatients = this.patientsSubject.value;
        this.patientsSubject.next([...currentPatients, newPatient]);
      },
      error => {
        console.error('Error adding patient:', error);
      }
    );
  }


  updatePatient(patient: Patient): void {
    const url = `${environment.baseUrl}/patients/${patient.id}/`;
    this.http.put<Patient>(url, patient).pipe(take(1)).subscribe(
      updatedPatient => {
        const currentPatients = this.patientsSubject.value.map(p => p.id === updatedPatient.id ? updatedPatient : p);
        this.patientsSubject.next(currentPatients);
      },
      error => {
        console.error('Error updating patient:', error);
      }
    );
  }


  deletePatient(patientId: number): Observable<void> {
    const url = `${environment.baseUrl}/patients/${patientId}/`;
    return this.http.delete<void>(url);
  }

}
