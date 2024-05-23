import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/shared/models/patient';
import { PatientService } from 'src/app/shared/services/patient.service';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';
import { EditPatientComponent } from '../edit-patient/edit-patient.component';
import { DatePipe } from '@angular/common';
import { DeletePatientComponent } from '../delete-patient/delete-patient.component';
import { DoctorService } from 'src/app/shared/services/doctor.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss'],
  providers: [DatePipe]
})
export class PatientInfoComponent implements OnInit {
  patient!: Patient;
  editMode: boolean = false;


  constructor(
    private dialogRef: MatDialogRef<PatientInfoComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ps: PatientService,
    private ds: DoctorService,
    private datePipe: DatePipe
  ) { }


  ngOnInit(): void {
    this.getPatientDetails();
  }


  getPatientDetails(): void {
    const patientid = this.data.id;
    this.ps.getPatientById(patientid).subscribe(
      patient => {
        this.patient = new Patient(patient);  // Sicherstellen, dass Patient korrekt instanziiert wird
        console.log(this.patient);
      },
      error => {
        console.error(error);
      }
    );
  }


  savePatientData(): void {
    if (this.editMode && this.patient.b_date) {
      this.patient.b_date = this.datePipe.transform(this.patient.b_date, 'yyyy-MM-dd')!;
    }
    this.editMode = false;
    this.ps.updatePatient(this.patient);
    this.dialogRef.close(true);
  }



  openDialogAddAppointment(patientId: number): void {
    const dialogRef = this.dialog.open(CreateAppointmentComponent, {
      data: { id: patientId }
    });
  }


  onDateChange(event: any): void {
    this.patient.b_date = event.value;
  }  


  close() {
    this.dialogRef.close();
  }


  openDialogDeletePatient(patientId: number) {    
    this.dialog.open(DeletePatientComponent, {
      data: { id: patientId}
    });
    this.dialogRef.close();
  }

}
