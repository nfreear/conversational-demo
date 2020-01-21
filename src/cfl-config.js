/**
 * CF-Launcher-formless configuration options.
 */

export const CFL_CONFIG = {
  formSelector: 'cf-form-0',
  // loaderSelector: 'cfl-loading',
  formId: {
    regex: 'id=(default|french|disability|security)',
    default: 'default'
  },
  theme: {
    regex: 'theme=(light|dark|red|green|blue|purple)',
    default: 'dark'
  },

  jsonUrls: {
    default: '/data/default-form.en.json',
    french : '/data/basic-form.fr.json',
    disability: '/data/disability-form.en.json',
    security  : '/data/security-test.en.json',
  },

  cfOptions: {
    formEl: null,
    suppressLog: false,
    showProgressBar: true,
    theme: 'dark',

    userInterfaceOptions:{
      /* controlElementsInAnimationDelay: 250,
      robot: {
        robotResponseTime: 0,
        chainedResponseTime: 400
      }, */
      user:{
        showThinking: true,
        showThumb: true
      }
    }
  },
};
