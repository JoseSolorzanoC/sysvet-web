import { Person, User } from './usuarios.interface';

export interface MedicoPersona extends User {
    person: Person;
}
