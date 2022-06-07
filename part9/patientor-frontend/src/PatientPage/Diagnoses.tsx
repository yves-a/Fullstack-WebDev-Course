import { useStateValue } from '../state';
const Diagnoses = ({ codes }: { codes: string[] }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <ul>
      {codes.map((code: string) => (
        <li key={code}>
          {code} {diagnoses[code].name}
        </li>
      ))}
    </ul>
  );
};
export default Diagnoses;
