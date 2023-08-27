import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {  
    dark: false, 
    themes: {
      light: {
        primary: '#3a4961',
        secondary: '#265f75',
        accent: '#00bcd4',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#5ce1e6',
        success: '#4caf50'
      },
      dark: {
        primary: '#3f51b5',
        secondary: '#2196f3',
        accent: '#00bcd4',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#009688',
        success: '#4caf50'
      },
    },
  },
});
