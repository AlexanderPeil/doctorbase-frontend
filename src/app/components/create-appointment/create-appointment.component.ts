import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from 'src/app/shared/models/appointment';
import { Doctor } from 'src/app/shared/models/doctor';
import { Patient } from 'src/app/shared/models/patient';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { PatientService } from 'src/app/shared/services/patient.service';


@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  patient!: Patient;
  appointment: Appointment = new Appointment();
  doctors: Doctor[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateAppointmentComponent>,
    private ps: PatientService,
    private as: AppointmentService,
    private ds: DoctorService,
    private datePipe: DatePipe
  ) { }


  ngOnInit(): void {
    this.getPatientData();
    this.getDoctorData();
    this.ds.getDoctors();
  }


  getPatientData() {
    const patientId = this.data.id;
    this.ps.getPatientById(patientId).subscribe(
      patient => {
        this.patient = patient;
        this.appointment.patient = patient;
      },
      error => {
        console.error(error);
      }
    )
  }


  getDoctorData() {
    this.ds.doctors$.subscribe(
      doctor => {
        this.doctors = doctor;
        console.log(doctor);
      },
      error => {
        console.error(error);
      }
    )
  }


  addAppointment() {
    this.appointment.date = this.datePipe.transform(this.appointment.date, 'yyyy-MM-dd')!;
    this.appointment.created_at = this.datePipe.transform(this.appointment.created_at, 'yyyy-MM-dd')!;
    this.as.createAppointment(this.appointment).subscribe(
      response => {
        this.dialogRef.close();
        console.log(response);
      },
      error => {
        console.error('Error creating appointment:', error);
      }
    );
  }


  close() {
    this.dialogRef.close();
  }

}
