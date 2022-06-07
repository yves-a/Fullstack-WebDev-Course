import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../constants';
import { Entry, EntryType, NewEntry, Patient } from '../types';
import { updatePatient } from '../state';
import axios from 'axios';
import Hospital from './Hospital';
import OccupationalHealthCare from './OccupationalHealthCare';
import HealthCheck from './HealthCheck';
import AddEntryModal from '../AddEntryModal';
import { Button } from '@material-ui/core';
// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };
const EntryChooser = ({ entry }: { entry: Entry }) => {
  console.log(entry.type);
  switch (entry.type) {
    case EntryType.Hospital:
      return <Hospital entry={entry} />;
    case EntryType.OccupationalHealthCare:
      return <OccupationalHealthCare entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheck entry={entry} />;
    default:
      return null;
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const myPatient = Object.values(patients).find(
    (patient) => patient.id === id
  );

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const getPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (myPatient) {
      if (!myPatient.ssn) {
        void getPatient();
      }
    }
  }, [id, dispatch]);
  const updatePatientEntries = async (values: NewEntry) => {
    if (myPatient) {
      try {
        const { data: entryFromApi } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${myPatient.id}/entries`,
          values
        );
        dispatch(updatePatient(entryFromApi));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.log(e?.response?.data, 'error');
          console.error(e?.response?.data || 'Unrecognized axios error');
          setError(String(e?.response?.data) || 'Unrecognized axios error');
        } else {
          console.error('Unknown error', e);
          setError('Unknown error');
        }
      }
    }
  };

  if (myPatient && id && myPatient.entries) {
    console.log(myPatient.entries);
    return (
      <div>
        <h1>
          {myPatient.name} {myPatient.gender}
        </h1>
        <p>ssn: {myPatient.ssn}</p>
        <p>occupation: {myPatient.occupation}</p>
        <h2>entries</h2>

        {myPatient.entries.map((entry: Entry) => {
          return <EntryChooser key={entry.id} entry={entry} />;
        })}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={updatePatientEntries}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div>
    );
  }
  return null;
};
export default PatientPage;
