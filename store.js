import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';

let state = {
  isFetchingContacts: true,
  isFetchingUser: true,
  contacts: [],
  user: {},
  error: false,
  messages: [
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('world'),
    createTextMessage('Hello'),
    createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
    }),
],
};

const listeners = [];

export default {
  getState() {
    return state;
  },
  setState(newState) {
    state = { ...state, ...newState };
    listeners.forEach(listener => listener());
  },
  onChange(newListener) {
    listeners.push(newListener);
    return () => listeners.filter(listener => listener !== newListener);
  },
};
