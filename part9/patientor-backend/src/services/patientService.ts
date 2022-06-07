/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
  NewEntry,
  Entry,
} from '../types';
import { v1 as uuid } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const id = uuid();
import patients from '../../data/patients';

const getPatients = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
const findById = (id: string): PatientEntry | undefined => {
  console.log(id);
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id,
    ...entry,
    entries: [],
  };
  console.log(entry);
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const updateEntry = (
  patient: PatientEntry,
  entry: NewEntry
): PatientEntry | undefined => {
  console.log(id);

  if (patient) {
    const updateEntry: Entry = {
      id,
      ...entry,
    };
    const updatedPatient = {
      ...patient,
      entries: patient.entries.concat(updateEntry),
    };
    return updatedPatient;
  }
  return undefined;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  findById,
  addPatient,
  updateEntry,
};
