import * as React from 'react';
import { useParams } from 'react-router-dom';
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
} from '@material-ui/core';
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
  const classes = useStyles();
  const trainerExerciselist: ExerciseType[] = exerciseAPI.filter((ex) =>
    ex.trainer_id.includes(+trainerId)
  );

  return hasPermision('ExerciseListComponent') ? (
    <>
      {trainerExerciselist.map((ex) => {
        return (
          <>
            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant='square' src={ex.images} />
                </ListItemAvatar>
                <ListItemText primary={ex.name} secondary={ex.description} />
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label='add' onClick={(e) => {}}>
                    <EditIcon />
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
