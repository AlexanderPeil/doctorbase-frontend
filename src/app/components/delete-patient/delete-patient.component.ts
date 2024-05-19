import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from 'src/app/shared/models/patient';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.scss']
})
export class DeletePatientComponent implements OnInit {
  patient: Patient = new Patient();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeletePatientComponent>,
    private ps: PatientService
  ) {}



  ngOnInit(): void {
    this.getPatientName();
  }


  getPatientName(): void {
    const patientid = this.data.id;
    this.ps.getPatientById(patientid).subscribe(
      patient => {
        this.patient = patient;
      },
      error => {
        console.error(error);
      }
    )
  }


  close() {
    this.dialogRef.close();
  }


  deleteCurrentPatient() {
    this.ps.deletePatient(this.data.id).subscribe(
      () => {
        this.dialogRef.close(true);
      },
      error => {
        console.error(error);
      }
    );
  }


}
