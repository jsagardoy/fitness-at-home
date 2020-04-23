import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  makeStyles,
  Theme,
  createStyles,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  ListItemText,
  TextField,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EditIcon from '@material-ui/icons/Edit';
import { hasPermision, AccessDeniedComponent } from 'commonApp/components';
import { ExerciseType } from 'commonApp/interfaces';
import { exerciseAPI } from 'api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  })
);

interface Props {}

export const ExerciseListComponent: React.FC<Props> = (props) => {
  const { trainerId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const trainerExerciselist: ExerciseType[] = exerciseAPI.filter((ex) =>
    ex.trainer_id.includes(+trainerId)
  );
  const [list, setList] = React.useState<ExerciseType[]>(trainerExerciselist);

  const handleFindTrainerExerciseList = (value: string) =>
    setList(trainerExerciselist.filter((ex) => ex.name.includes(value)));

  const handleExerciseDetails = (id: number) => {
    history.push(`/trainer/${trainerId}/exercise-info/${id}`);
  };

  return hasPermision('ExerciseListComponent') ? (
    <>
      <TextField
        name='find'
        onChange={(e) => handleFindTrainerExerciseList(e.target.value)}
        label='Buscar'
        placeholder='Filtrar...'
      />
      {list.map((ex) => {
        return (
          <>
            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant='square' src={ex.images} />
                </ListItemAvatar>
                <ListItemText primary={ex.name} secondary={ex.description} />
                <ListItemSecondaryAction>
                  {/* TBD onClick */}
                  <IconButton edge='end' aria-label='edit' onClick={(e) => {}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge='end'
                    aria-label='details'
                    onClick={(e) => handleExerciseDetails(ex.exercise_id)}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Divider />
          </>
        );
      })}
    </>
  ) : (
    <AccessDeniedComponent />
  );
};
