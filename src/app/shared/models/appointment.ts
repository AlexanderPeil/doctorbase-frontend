import { Doctor } from "./doctor";
import { Patient } from "./patient";


export class Appointment {
  id: number;
  doctor: Doctor;
  patient: Patient;
  title: string;
  description: string;
  date: string;
  created_at: string;

  constructor(obj?: any) {
    this.id = obj?.id || 1;
    this.doctor = obj?.doctor ? new Doctor(obj.doctor) : new Doctor();
    this.patient = obj?.patient ? new Patient(obj.patient) : new Patient();
    this.title = obj?.title || '';
    this.description = obj?.description || '';
    this.date = obj?.date ? this.formatDate(obj.date) : this.formatDate(new Date());
    this.created_at = obj?.created_at ? this.formatDate(obj.created_at) : this.formatDate(new Date());
  }

  private formatDate(date: Date | string): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  public toJSON(): { id: number, doctor: any, patient: any, title: string, description: string, date: string, created_at: string } {
    return {
      id: this.id,
      doctor: this.doctor.id, 
      patient: this.patient.id, 
      title: this.title,
      description: this.description,
      date: this.date,
      created_at: this.created_at
    };
  }
}
