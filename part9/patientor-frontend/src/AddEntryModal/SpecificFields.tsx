import { Field } from 'formik';
import { EntryType, HealthCheckRating } from '../types';
import {
  TextField,
  SelectField,
  HealthRatingOption,
} from '../AddPatientModal/FormField';
const healthRatingOptions: HealthRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
  { value: HealthCheckRating.HighRisk, label: 'High Risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' },
];
const SpecificFields = ({ entryType }: { entryType: any }) => {
  console.log(entryType, 'entry');
  switch (entryType) {
    case EntryType.Hospital:
      return (
        <>
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Critieria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );
    case EntryType.HealthCheck:
      return (
        <SelectField
          label="Health Rating"
          name="healthCheckRating"
          options={healthRatingOptions}
        />
      );
    case EntryType.OccupationalHealthCare:
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Date of Start of Sick Leave"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Date of End of Sick Leave"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );
    default:
      return null;
  }
};
export default SpecificFields;
