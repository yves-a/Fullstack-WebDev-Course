const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
import { CoursePart } from '../types';
const Part = ({ givenPart }: { givenPart: CoursePart }) => {
  switch (givenPart.type) {
    case 'normal':
      return (
        <div>
          <p>
            <b>
              {givenPart.name} {givenPart.exerciseCount}
            </b>
          </p>
          <p>
            <i>{givenPart.description}</i>
          </p>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <p>
            <b>
              {givenPart.name} {givenPart.exerciseCount}
            </b>
          </p>
          <p>project exercises {givenPart.groupProjectCount}</p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <p>
            <b>
              {givenPart.name} {givenPart.exerciseCount}
            </b>
          </p>
          <p>
            <i>{givenPart.description}</i>
          </p>
          <p>submit to {givenPart.exerciseSubmissionLink}</p>
        </div>
      );

    case 'special':
      return (
        <div>
          <p>
            <b>
              {givenPart.name} {givenPart.exerciseCount}
            </b>
          </p>
          <p>
            <i>{givenPart.description}</i>
          </p>
          required skills:{' '}
          {givenPart.requirements.map((requirement) => {
            if (
              givenPart.requirements.indexOf(requirement) ===
              givenPart.requirements.length - 1
            ) {
              return requirement;
            }
            return requirement + ', ';
          })}
        </div>
      );
    default:
      return assertNever(givenPart);
  }
};

export default Part;
