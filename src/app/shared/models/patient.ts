export class Patient {
    firstname: string;
    lastname: string;
    b_date: Date;

    constructor(obj?: { firstname: string, lastname: string, b_date: Date }) {
        this.firstname = obj?.firstname || '';
        this.lastname = obj?.lastname || '';
        this.b_date = obj?.b_date ?? new Date();
    }

    public toJSON(): { firstname: string, lastname: string, b_date: Date } {
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            b_date: this.b_date
        };
    }
}
