import { Appointment } from "./appointment";


export class Patient {
  id: number;
  firstname: string;
  lastname: string;
  b_date: Date;
  appointments: Appointment[];

  constructor(obj?: { id: number, firstname: string, lastname: string, b_date: Date, appointments?: any[] }) {
    this.id = obj?.id || 1;
    this.firstname = obj?.firstname || '';
    this.lastname = obj?.lastname || '';
    this.b_date = obj?.b_date ? new Date(obj.b_date) : new Date();
    this.appointments = obj?.appointments?.map((a: any) => new Appointment(a)) || [];
  }

  public toJSON(): { id: number, firstname: string, lastname: string, b_date: Date, appointments: any[] } {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      b_date: this.b_date,
      appointments: this.appointments.map(a => a.toJSON()) 
    };
  }
}
