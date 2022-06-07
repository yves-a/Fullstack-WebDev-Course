import Part from './Part';
import { CoursePart } from '../types';

const Content = ({ parts }: { parts: CoursePart[] }) => {
  console.log(parts);
  return (
    <div>
      {parts.map((part: CoursePart) => (
        <Part key={part.name} givenPart={part} />
      ))}
    </div>
  );
};
export default Content;
