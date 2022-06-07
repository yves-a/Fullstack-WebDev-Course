import { DiagnosesEntry } from '../types';

import diagnoses from '../../data/diagnoses';

const getDiagnoses = (): Array<DiagnosesEntry> => {
  return diagnoses;
};

const addDiary = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiary,
};
