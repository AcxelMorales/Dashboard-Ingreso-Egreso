export default class User {

    nombre: string;
    correo: string;
    uid: string;

    constructor(obj: DataObj) {
        this.nombre = obj && obj.nombre || null;
        this.correo = obj && obj.correo || null;
        this.uid    = obj && obj.uid || null;
    }

}

interface DataObj {

    uid: string;
    correo: string;
    nombre: string;

}