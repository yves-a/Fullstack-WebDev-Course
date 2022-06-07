import {
  NewPatientEntry,
  Gender,
  NewEntry,
  EntryType,
  NewBaseEntry,
  Discharge,
  HealthCheckRating,
  SickLeave,
} from './types';

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newEntry;
};

type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  type: unknown;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }

  return criteria;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const isCodes = (codes: unknown): codes is string[] => {
  if (!Array.isArray(codes)) {
    throw new Error('Incorrect or missing codes');
  }
  codes.forEach((code) => {
    if (!isString(code)) {
      throw new Error('Incorrect or missing codes');
    }
  });
  return true;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes || !isCodes(codes)) {
    throw new Error('Incorrect or missing codes');
  }
  return codes;
};

const parseSickLeave = (leave: SickLeave): SickLeave => {
  if (!leave) {
    throw new Error('Incorrect or missing sick leave');
  }
  return {
    startDate: parseDate(leave.startDate),
    endDate: parseDate(leave.endDate),
  };
};

const parseDischarge = (discharge: Discharge): Discharge => {
  if (!discharge) {
    throw new Error('Incorrect or missing discharge');
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthRating = (param: any): param is HealthCheckRating => {
  console.log(Object.values(HealthCheckRating).includes(param), 'yo');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }

  return rating;
};

const toNewBaseEntry = ({
  description,
  date,
  specialist,
  type,
  diagnosisCodes,
}: EntryFields): NewBaseEntry => {
  const newEntry: NewBaseEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    type: parseType(type),
  };
  if (diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }
  return newEntry;
};

export const toNewEntry = (entry: any): NewEntry => {
  const updatedEntry = toNewBaseEntry(entry) as NewEntry;

  switch (updatedEntry.type) {
    case EntryType.Hospital:
      return { ...updatedEntry, discharge: parseDischarge(entry.discharge) };
    case EntryType.HealthCheck:
      return {
        ...updatedEntry,
        healthCheckRating: parseHealthRating(entry.healthCheckRating),
      };
    case EntryType.OccupationalHealthCare:
      if (entry.sickLeave) {
        return {
          ...updatedEntry,
          employerName: parseName(entry.employerName),
          sickLeave: parseSickLeave(entry.sickLeave),
        };
      }
      return {
        ...updatedEntry,
        employerName: parseName(entry.employerName),
      };
    default:
      return assertNever(updatedEntry);
  }
};
export default { toNewPatientEntry, toNewEntry };
