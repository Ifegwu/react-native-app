import uuidv4 from 'uuid/v4';

import capitalize from '../utils/capitalize';

//weather app
export const fetchLocationId = async city => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/search/?query=${city}`,
  );
  const locations = await response.json();
  return locations[0].woeid;
};

export const fetchWeather = async woeid => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/${woeid}/`,
  );
  const { title, consolidated_weather } = await response.json();
  const { weather_state_name, the_temp } = consolidated_weather[0];

  return {
    location: title,
    weather: weather_state_name,
    temperature: the_temp,
  };
};

//image feed
export const fetchImages = async () => {
  const response = await fetch('https://unsplash.it/list');
  const images = await response.json();

  return images;
};

export const getImageFromId = id => `https://unsplash.it/${600}/${600}?image=${id}`;



const mapContact = contact => {
  const {
    name, picture, phone, cell, email,
  } = contact;

  return {
    id: uuidv4(),
    name: `${capitalize(name.first)} ${capitalize(name.last)}`,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() >= 0.5, // randomly generate favorite contacts
  };
};

export const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
  const contactData = await response.json();

  return contactData.results.map(mapContact);
};

export const fetchUserContact = async () => {
  const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
  const userData = await response.json();

  return mapContact(userData.results[0]);
};

export const fetchRandomContact = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const userData = await response.json();

  return mapContact(userData.results[0]);
};