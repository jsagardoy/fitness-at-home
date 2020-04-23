import * as React from 'react';
import { AccessDeniedComponent, hasPermision } from 'commonApp/components';
import { useParams } from 'react-router-dom';
import { ExerciseType } from 'commonApp/interfaces';
import { exerciseAPI } from 'api';
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Collapse,
} from '@material-ui/core';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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

interface Props {}

export const ExerciseCardComponent: React.FC<Props> = (props) => {
  const { exerciseId } = useParams();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const getExercise = (): ExerciseType =>
    exerciseAPI.find((ex) => ex.exercise_id === +exerciseId);

  const exercise: ExerciseType = getExercise();

  return hasPermision('ExerciseCardComponent') ? (
    <Card className={classes.root}>
      <CardHeader title={exercise.name} subheader={exercise.exercise_id} />
      <CardMedia
        className={classes.media}
        image={exercise.images}
        title={exercise.name}
      />
      <CardContent></CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show details'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {exercise.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  ) : (
    <AccessDeniedComponent />
  );
};
