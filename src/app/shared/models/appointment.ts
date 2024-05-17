import { Doctor } from "./doctor";
import { Patient } from "./patient";


export class Appointment {
  id: number;
  doctor: Doctor;
  patient: Patient;
  title: string;
  description: string;
  date: Date;
  created_at: Date;

  constructor(obj?: { id: number, doctor: any, patient: any, title: string, description: string, date: Date, created_at: Date }) {
    this.id = obj?.id || 1;
    this.doctor = obj?.doctor ? new Doctor(obj.doctor) : new Doctor();
    this.patient = obj?.patient ? new Patient(obj.patient) : new Patient();
    this.title = obj?.title || '';
    this.description = obj?.description || '';
    this.date = obj?.date ? new Date(obj.date) : new Date();
    this.created_at = obj?.created_at ? new Date(obj.created_at) : new Date();
  }

  public toJSON(): { id: number, doctor: any, patient: any, title: string, description: string, date: Date, created_at: Date } {
    return {
      id: this.id,
      doctor: this.doctor.toJSON(), 
      patient: this.patient.toJSON(), 
      title: this.title,
      description: this.description,
      date: this.date,
      created_at: this.created_at
    };
  }
}
