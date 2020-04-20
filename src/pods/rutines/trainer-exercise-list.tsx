import * as React from 'react';
import {
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { ExerciseType, ExerciseSettings } from 'commonApp/interfaces';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface Props {
  trainerExercisesList: ExerciseType[];
  clientExercisesList: ExerciseSettings[];
  handleSearchFilter: (value: string, field: string) => void;
  handleAddExerciseSettings: (exerciseId: number) => void;
}

export const TrainerExerciseListComponent: React.FC<Props> = (props) => {
  const {
    handleSearchFilter,
    trainerExercisesList,
    handleAddExerciseSettings,
    clientExercisesList,
  } = props;

  const needsToShow = (id: number): boolean =>
    clientExercisesList.find((elem) => elem.exercise_id === id)?false:true;

  return (
    <div id='trainer list'>
      <TextField
        placeholder='Entrenamiento'
        onChange={(e) => handleSearchFilter(e.target.value, 'trainer')}
      />
      <List className='trainer-list' component='div'>
        {trainerExercisesList.map((t) => (
          needsToShow(t.exercise_id)?
          <ListItem key={t.exercise_id}>
            <ListItemAvatar>
              <Avatar variant='square' src={t.images} />
            </ListItemAvatar>
            <Typography paragraph gutterBottom>
              {t.name}
            </Typography>
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='add'
                onClick={(e) => handleAddExerciseSettings(t.exercise_id)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
            </ListItem>
            :
            null
        ))}
      </List>
    </div>
  );
};
