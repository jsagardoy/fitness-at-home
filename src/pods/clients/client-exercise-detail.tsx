import * as React from 'react';
import {
  ExerciseType,
  ExerciseSettings,
  TrainerType,
} from 'commonApp/interfaces';
import { exerciseAPI, trainerAPI, clientAPI } from 'api';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Theme,
  IconButton,
  Collapse,
  CardActions,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '30%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
    notDone: {
      color: 'grey',
    },
    done: {
      color: 'green',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
);

interface Props {
  clientExercise: ExerciseSettings;
  trainer: TrainerType;
}
export const ClientExerciseComponent: React.FC<Props> = (props) => {
  const { clientExercise, trainer } = props;
  const { clientId } = useParams();
  const numberClientId: number = +clientId;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [checked, setChecked] = React.useState(clientExercise.done);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickDone = () => {
    setChecked(!checked);
    // TBD change it with api call to perform the changes
    const newExerElem = { ...clientExercise, done: !clientExercise.done };
    const client = clientAPI.find((c) => c.client_id === numberClientId);
    const index = client.exercisesList.findIndex((e) => e.exercise_id === clientExercise.exercise_id);
    client.exercisesList.splice(index, 1, newExerElem);
    clientAPI.splice(clientAPI.findIndex((c) => c.client_id === client.client_id), 1, client);
  };

  const exercise: ExerciseType = exerciseAPI.find(
    (elem) =>
      elem.exercise_id === clientExercise.exercise_id &&
      trainer.exerciseList.includes(clientExercise.exercise_id) &&
      elem.trainer_id.includes(trainer.trainer_id)
  );

  const isExerciseAssigned = (): boolean =>
    trainer.exerciseList.includes(clientExercise.exercise_id);

  return exercise && isExerciseAssigned() ? (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src={trainer.trainer_info.avatar} />}
        title={exercise.name}
      />
      <CardMedia
        className={classes.media}
        image={exercise.images}
        title={exercise.name}
      />
      <CardContent>
        <Typography paragraph>Repeticiones: {clientExercise.reps}</Typography>
        <Typography paragraph>Series: {clientExercise.sets}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label='add to favorites'
          onClick={(e) => handleClickDone()}
        >
          {checked ? (
            <CheckCircleOutlineIcon className={classes.done} />
          ) : (
            <CheckCircleOutlineIcon className={classes.notDone} />
          )}
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Descripción:</Typography>
          <Typography paragraph>{exercise.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  ) : null;
};
