export class Doctor {
    id: number;
    speciality: string;
    title: string;

    constructor(obj?: { id:number, speciality:string, title:string}) {
        this.id = obj?.id || 1;
        this.speciality = obj?.speciality || '',
        this.title = obj?.title || ''
    }


    public toJSON(): {id:number, speciality:string, title:string} {
        return {
            id: this.id,
            speciality: this.speciality,
            title: this.title
        }
    }
}