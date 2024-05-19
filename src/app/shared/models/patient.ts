import { PatientData } from "../interfaces/patient";
import { Appointment } from "./appointment";

export class Patient {
  id: number;
  firstname: string;
  lastname: string;
  b_date: string;
  appointments: Appointment[];

  constructor(obj?: any)  {
    this.id = obj?.id || 1;
    this.firstname = obj?.firstname || '';
    this.lastname = obj?.lastname || '';
    this.b_date = obj?.b_date ? this.formatDate(obj.b_date) : this.formatDate(new Date());
    this.appointments = obj?.appointments?.map((a: any) => new Appointment(a)) || [];
  }

  private formatDate(date: Date | string): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  public toJSON(): PatientData {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      b_date: this.b_date, 
      appointments: this.appointments.map(a => a.toJSON())
    };
  }
}
