import * as React from 'react';
import { TextField, Modal, Button } from '@material-ui/core';
import { Form, Field } from 'react-final-form';

interface Props {
  openModalState: boolean;
  setExerciseSettings: (reps: number, set: number) => void;
}

export const ExerciseModalComponent: React.FC<Props> = (props) => {
  const { setExerciseSettings, openModalState} = props;
  const [openModal, setOpenModal] = React.useState(openModalState);
  const handleCloseModal = () => setOpenModal(false);

  const onSubmit = (settings) => {
    setExerciseSettings(settings.reps, settings.sets);
  };

  const body = (
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
  );

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      {body}
    </Modal>
  );
};
