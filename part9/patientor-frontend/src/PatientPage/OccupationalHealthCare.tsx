import { OccupationalHealthcareEntry } from '../types';
import Diagnoses from './Diagnoses';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {entry.date} <AssuredWorkloadIcon />
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <i>{entry.description}</i>
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          diagnose by {entry.specialist}
        </Typography>
        {entry.diagnosisCodes && <Diagnoses codes={entry.diagnosisCodes} />}
      </CardContent>
    </Card>
  );
};
export default OccupationalHealthcare;
