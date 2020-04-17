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
import { ExerciseType } from 'commonApp/interfaces';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface Props {
  trainerExercisesList: ExerciseType[];
  handleSearchFilter: (value: string, field: string) => void;
  handleAddExerciseSettings: (exerciseId: number) => void;
}

export const TrainerExerciseListComponent: React.FC<Props> = (props) => {
  const {
    handleSearchFilter,
    trainerExercisesList,
    handleAddExerciseSettings,
  } = props;

  return (
    <div id='trainer list'>
      <TextField
        placeholder='Entrenamiento'
        onChange={(e) => handleSearchFilter(e.target.value, 'trainer')}
      />
      <List className='trainer-list' component='div'>
        {trainerExercisesList.map((t) => (
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
        ))}
      </List>
    </div>
  );
};
