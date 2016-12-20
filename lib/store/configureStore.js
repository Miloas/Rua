import configureStoreForProduction from './configureStore.production';
import configureStoreForDevelopment from './configureStore.development';

export default () => {
  if (process.env.NODE_ENV === 'production') {
    return configureStoreForProduction();
  }

  return configureStoreForDevelopment();
};
