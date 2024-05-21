export class Doctor {
    id: number;
    speciality: string;
    title: string;
    firstname: string;
    lastname: string;

    constructor(obj?: { id:number, speciality:string, title:string, firstname: string, lastname: string}) {
        this.id = obj?.id || 1;
        this.speciality = obj?.speciality || '',
        this.title = obj?.title || '',
        this.firstname = obj?.firstname || '';
        this.lastname = obj?.lastname || '';
    }


    public toJSON(): {id:number, speciality:string, title:string, firstname: string, lastname: string} {
        return {
            id: this.id,
            speciality: this.speciality,
            title: this.title,
            firstname: this.firstname,
            lastname: this.lastname
        }
    }
}