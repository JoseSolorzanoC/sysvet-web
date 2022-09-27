export interface Person {
    id: string;
    documentTypeId: number;
    documentNumber: string;
    fullName: string;
    birthDate: Date;
    cellphone: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Tutor {
    id: string;
    personId: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    createdBy?: any;
    updatedAt: Date;
    updatedBy?: any;
    status: boolean;
    role: string;
    person: Person;
}

export interface PetRace {
    id: number;
    name: string;
    status: boolean;
}

export interface PetSpecie {
    id: number;
    name: string;
    status: boolean;
}

export interface ClinicalConsultation {
    id: string;
    petId: string;
    reason: string;
    openedDate: Date;
    anamnesis: string;
    petCf: number;
    petRf: number;
    petPulse: number;
    petTemperature: number;
    petConsultationWeight: number;
    petAttitude: string;
    petCorporalCondition: string;
    petHidratationState: string;
    createdAt: Date;
    createdBy?: any;
    updatedAt: Date;
    updatedBy?: any;
    status: boolean;
}

export interface Pet {
    id: string;
    tutorId: string;
    raceId: number;
    specieId: number;
    name: string;
    birthDate: Date;
    furColor: string;
    lastWeight: number;
    photoUrl: string;
    createdAt: Date;
    createdBy?: any;
    updatedAt: Date;
    tutor: Tutor;
    petRace: PetRace;
    petSpecie: PetSpecie;
    clinicalConsultations: ClinicalConsultation[];
}
