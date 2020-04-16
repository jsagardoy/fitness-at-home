import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ClientType, TrainerType } from 'commonApp/interfaces';

import {
  ListItemSecondaryAction,
  IconButton,
  ListItemIcon,
  Typography,
} from '@material-ui/core';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import PhoneIcon from '@material-ui/icons/Phone';

import { useHistory, useParams } from 'react-router-dom';
import { trainerAPI, clientAPI } from 'api';
import { hasPermision, AccessDeniedComponent } from 'commonApp/components';

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

export interface Props {}

export const ClientsListContainerComponent: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { trainerId } = useParams();

  const handleGoToDetails = (id: number) => {
    history.push(`/trainer/${trainerId}/client/${id}`);
  };

  const handleGoToRoutines = (id: number) => {
    history.push(`/trainer/${trainerId}/client/${id}/generate-rutine`);
  };

  const getTrainer = (id: number): TrainerType =>
    trainerAPI.find((trainer) => trainer.trainer_id === id);

  const getClientsList = (): ClientType[] => {
    // returs the expecifict client list for the logged trainer
    const trainer: TrainerType = getTrainer(+trainerId);
    const trainerCL: number[] = trainer.clientList;
    const cl: ClientType[] = trainerCL.map((t) =>
      clientAPI.find((c) => c.client_id === t)
    );
    return cl;
  };

  const trainerClientsList = getClientsList();

  return hasPermision('ClientsListContainerComponent') ? (
    <List className={classes.root}>
      {trainerClientsList.map((client) => {
        return (
          <div key={client.client_id}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar
                  alt={`${client.person_info.name} ${client.person_info.lastName}`}
                  src={client.person_info.avatar}
                />
              </ListItemAvatar>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${client.person_info.name} ${client.person_info.lastName}`}
                secondary={client.person_info.phone}
              />

              <ListItemSecondaryAction>
                <IconButton
                  edge='end'
                  aria-label='routines'
                  onClick={(e) => handleGoToRoutines(client.client_id)}
                >
                  <AccessibilityNewIcon />
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='detail'
                  onClick={(e) => handleGoToDetails(client.client_id)}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant='inset' component='li' />
          </div>
        );
      })}
    </List>
  ) : (
    <AccessDeniedComponent />
  );
};
