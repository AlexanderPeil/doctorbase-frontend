import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/shared/models/patient';
import { PatientService } from 'src/app/shared/services/patient.service';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  patient!: Patient;


  constructor(
    private dialogRef: DialogRef,
    private dialog: Dialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ps: PatientService
  ) { }


  ngOnInit(): void {
    this.getPatientDetails();  
  }


  getPatientDetails(): void {
    const patientid = this.data.id;
    this.ps.getPatientById(patientid).subscribe(
      patient => {
        this.patient = patient;
        console.log(this.patient);  
      },
      error => {
        console.error(error);
      }
    )
  }


  openDialogAddAppointment(patientId: number): void {
    const dialogRef = this.dialog.open(CreateAppointmentComponent, {
      data: { id: patientId}
    });
  }

}
