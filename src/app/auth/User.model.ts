export default class User {

    nombre: string;
    correo: string;
    uid: string;

    constructor(nombre: string, correo: string, uid: string) {
        this.nombre = nombre;
        this.correo = correo;
        this.uid = uid;
    }

}