import { type ComponentType } from 'react';
import { Notifier } from 'react-native-notifier';
import {
  CustomNotification,
  CustomNotificationProps,
} from './customNotification';

interface NotificationProps {
  title: string;
  description: string;
  duration?: number;
  animationDuration?: number;
  hideOnPress?: boolean;
  Component: ComponentType<CustomNotificationProps>;
  componentProps: CustomNotificationProps;
}

const showCustomNotification = (props: NotificationProps) => {
  Notifier.showNotification({
    Component: props.Component,
    componentProps: props.componentProps,
    duration: props.duration || 3000,
    animationDuration: props.animationDuration || 400,
    hideOnPress: props.hideOnPress ?? true,
  });
};

export const displayErrorMessage = (
  title: string,
  description: string,
  duration?: number,
) => {
  showCustomNotification({
    title,
    description,
    duration,
    Component: CustomNotification,
    componentProps: {
      title,
      description,
      alertType: 'error',
    },
  });
};

export const displaySuccessMessage = (
  title: string,
  description: string,
  duration?: number,
) => {
  showCustomNotification({
    title,
    description,
    duration,
    Component: CustomNotification,
    componentProps: {
      title,
      description,
      alertType: 'success',
    },
  });
};
