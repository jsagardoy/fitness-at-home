import * as React from 'react';
import { hasPermision, AccessDeniedComponent } from 'commonApp/components';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { exerciseAPI, trainerAPI } from 'api';
import { ExerciseType } from 'commonApp/interfaces/exercise';
import { useParams, useHistory } from 'react-router-dom';
import { TrainerType } from 'commonApp/interfaces';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
// TBD
interface Props {}

export const ExerciseFormComponent: React.FC<Props> = (props) => {
  const { trainerId } = useParams();
  const [open, setOpen] = React.useState(false);
  const getLastExerciseId = (): number =>
    exerciseAPI.reduce((p, c) => {
      if (c.exercise_id > p) {
        return c.exercise_id;
      } else {
        return p;
      }
    }, 0);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const getNewExerciseId = () => getLastExerciseId() + 1;
  const getTrainerId = () => +trainerId;

  const getTrainer = (id: number): TrainerType =>
    trainerAPI.find((t) => t.trainer_id === id);

  const onSubmit = (exerciseInfo: ExerciseType) => {
    const newExercise: ExerciseType = {
      exercise_id: getNewExerciseId(),
      name: exerciseInfo.name,
      description: exerciseInfo.description,
      trainer_id: [getTrainerId()],
      images: exerciseInfo.images,
    };
    const trainer = getTrainer(getTrainerId());
    trainer.exerciseList.push(newExercise.exercise_id);
    exerciseAPI.push(newExercise);
    // TBD set ofpen in according to BBDD promise
    setOpen(true);
    };
  return hasPermision('ExerciseFormComponent') ? (
    <Paper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitError }) => (
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Field name='name'>
              {({ input }) => (
                <TextField placeholder='Nombre' type='text' {...input} />
              )}
            </Field>
            <Field name='description'>
              {({ input }) => (
                <TextField
                  placeholder='Descripción'
                  type='text'
                  {...input}
                  multiline
                />
              )}
            </Field>
            <Field name='image'>
              {({ input }) => <Input type='file' {...input} />}
            </Field>
            {submitError && <div className='error'>{submitError}</div>}
            <Button type='submit'>Submit</Button>
          </form>
        )}
      />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity='success'>
          Se ha creado un ejercicio!
        </Alert>
      </Snackbar>
    </Paper>
  ) : (
    <AccessDeniedComponent />
  );
};
