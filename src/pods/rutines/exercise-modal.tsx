import * as React from 'react';
import { TextField, Modal, Button, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Form, Field } from 'react-final-form';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface Props {
  openModalState: boolean;
  setExerciseSettings: (reps: number, set: number) => void;
}

export const ExerciseModalComponent: React.FC<Props> = (props) => {
  const { setExerciseSettings, openModalState } = props;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const onSubmit = (settings) => {
    setExerciseSettings(settings.reps, settings.sets);
  };


  const body = (
    <div style={modalStyle} className={classes.paper}>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitError }) => (
        <form onSubmit={handleSubmit}>
          <p>Por favor introduzca los siguientes valores:</p>
          <Field name='reps'>
            {({ input }) => (
              <TextField
                label='Repeticiones'
                placeholder='0'
                type='number'
                {...input}
              />
            )}
          </Field>
          <Field name='sets'>
            {({ input }) => (
              <TextField
                label='Series'
                placeholder='0'
                type='number'
                {...input}
              />
            )}
          </Field>
          {submitError && <div className='error'>{submitError}</div>}
          <Button type='submit'>Aceptar</Button>
        </form>
      )}
      />
      </div>
  );

  return (
    <>
      <Modal open={openModalState} disableAutoFocus={false}>
      {body}
      </Modal>
    </>
  );
};
