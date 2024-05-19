import { DialogRef } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/shared/models/patient';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  patient: Patient = new Patient;

  constructor(
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ps: PatientService,
    private datePipe: DatePipe
  ) {}


  ngOnInit() {
    console.log('Data received in EditPatientComponent:', this.data);
    this.getPatientDetails();
  }


  getPatientDetails(): void {
    const patientId = this.data.id;
    if (!patientId) {
      console.error('Patient ID is undefined');
      return;
    }
    this.ps.getPatientById(patientId).subscribe(
      patient => {
        this.patient = patient; // Der Patient ist bereits korrekt typisiert
      },
      error => {
        console.error('Error fetching patient details:', error);
      }
    );
  }




  updatePatientData(): void {
    this.ps.updatePatient(this.patient);
    this.dialogRef.close(true);
  }


  close() {
    this.dialogRef.close();
  }

}
