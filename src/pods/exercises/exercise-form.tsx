import * as React from 'react';
import { hasPermision, AccessDeniedComponent } from 'commonApp/components';
//TBD
interface Props {}

export const ExerciseFormComponent: React.FC<Props> = (props) => {
  return hasPermision('ExerciseFormComponent') ? (
    <></>
  ) : (
    <AccessDeniedComponent />
  );
};
