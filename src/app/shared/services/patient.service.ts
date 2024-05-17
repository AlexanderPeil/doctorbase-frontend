import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Patient } from '../models/patient';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientsSubject = new BehaviorSubject<Patient[]>([]);
  public patients$ = this.patientsSubject.asObservable();


  constructor(private http: HttpClient) { }


  // getPatients(): void {
  //   const url = `${environment.baseUrl}/patients/`;
  //   this.http.get<Patient[]>(url).subscribe(
  //     patientsData => {
  //       const patientObjects = patientsData.map(data => new Patient(data));
  //       this.patientsSubject.next(patientObjects);
  //     },
  //     error => {
  //       console.error('Error fetching patients:', error);
  //     }
  //   );
  // }


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


  createPatient(patientData: FormData) {
    const url = `${environment.baseUrl}/patients/`;
    return this.http.post(url, patientData);
  }


}
