import { Component } from '@angular/core';
import { Patient } from 'src/app/shared/models/patient';
import { AppointmentService } from 'src/app/shared/services/appointment.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent {
  patient = new Patient;


  constructor(
    private as: AppointmentService
  ) {}

}
