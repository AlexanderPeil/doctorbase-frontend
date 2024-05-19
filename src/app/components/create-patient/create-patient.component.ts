import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Patient } from 'src/app/shared/models/patient';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss'],
  providers: [DatePipe]
})
export class CreatePatientComponent {
  patient = new Patient;


  constructor(
    private as: AppointmentService,
    private ps: PatientService,
    private dialogRef: MatDialogRef<CreatePatientComponent>,
    private datePipe: DatePipe
  ) {}


  close() {
    this.dialogRef.close();
  }

  savePatient(): void {
    if (this.patient.b_date) {
      this.patient.b_date = this.datePipe.transform(this.patient.b_date, 'yyyy-MM-dd')!;
    }
    this.ps.addPatient(this.patient);
    this.dialogRef.close(true);
  }


}
