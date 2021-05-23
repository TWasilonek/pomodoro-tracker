import {AppRegistry} from 'react-native';

//https://github.com/uuidjs/uuid#react-native--expo
import 'react-native-get-random-values';

import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
