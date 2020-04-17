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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

interface Props {
    clientExercisesList: ExerciseType[];
  handleSearchFilter: (value: string, field: string) => void;
}

export const ClientExerciseListComponent: React.FC<Props> = (props) => {
  const { handleSearchFilter, clientExercisesList } = props;

  return (
    <div id='client-list'>
      <TextField
        placeholder='Entrenamiento'
        onChange={(e) => handleSearchFilter(e.target.value, 'client')}
      />
      <List className='trainer-list' component='div'>
        {clientExercisesList.map((t) => (
          <ListItem key={t.exercise_id}>
            <ListItemAvatar>
              <Avatar variant='square' src={t.images} />
            </ListItemAvatar>
            <Typography paragraph gutterBottom>
              {t.name}
            </Typography>
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='remove'>
                <ArrowBackIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
