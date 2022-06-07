import React, { useState, useCallback } from 'react';

// import { Form, Formik } from 'formik';
import AddEntryForm from './AddEntryForm';
import { EntryOption } from '../AddPatientModal/FormField';
import { NewEntry, EntryType } from '../types';
import Select from 'react-select';

const baseInitialValues = {
  description: '',
  date: '',
  specialist: '',
};

const healthCheckInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: 0,
};

const occupationalHealthCareIntitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.OccupationalHealthCare,
  employerName: '',
  sickLeave: { startDate: '', endDate: '' },
};

const hospitalIntitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.Hospital,
  discharge: { date: '', criteria: '' },
};

interface Props {
  onSubmit: (value: NewEntry) => void;
  onCancel: () => void;
}
const entryTypes: EntryOption[] = [
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.HealthCheck, label: 'Health Check' },
  {
    value: EntryType.OccupationalHealthCare,
    label: 'Occupational Healthcare',
  },
];
const PreEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.Hospital);
  const EntryForm = useCallback(() => {
    console.log(entryType, 'entry');
    switch (entryType) {
      case EntryType.Hospital:
        return (
          <AddEntryForm
            initialValues={hospitalIntitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.HealthCheck:
        return (
          <AddEntryForm
            initialValues={healthCheckInitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.OccupationalHealthCare:
        return (
          <AddEntryForm
            initialValues={occupationalHealthCareIntitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      default:
        return null;
    }
  }, [entryType, onSubmit, onCancel]);
  console.log(entryType, 'ash');
  const handleChange = (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setEntryType(event.value);
  };
  return (
    <div>
      <form className="form ui">
        <Select
          defaultValue={entryTypes[0]}
          options={entryTypes}
          onChange={handleChange}
        />
      </form>
      {EntryForm()}
    </div>
  );
};

export default PreEntryForm;
