/**
 * Load form-structure from a JSON file, and create a 'conversational-form'.
 *
 * @see https://space10-community.github.io/conversational-form/docs/1.0.0/functionality/formless/
 */

import { CFL_CONFIG } from './cfl-config.js';

const cf = window.cf;
const fetch = window.fetch;
// Was: const CF_LAUNCH_OPT = window.CF_LAUNCH_OPTIONS;
const M_PARAM = window.location.href.match(/id=(\w+)/);

const formId = M_PARAM ? M_PARAM[ 1 ] : CFL_CONFIG.defaultId;

let formJsonUrl;
if (formId in CFL_CONFIG.jsonUrls) {
  formJsonUrl = CFL_CONFIG.jsonUrls[ formId ];
} else {
  formJsonUrl = CFL_CONFIG.jsonUrls[ CFL_CONFIG.defaultId ];
}

fetch(formJsonUrl).then(resp => resp.json()).then(cfFormData => {
  console.warn('CF form data:', cfFormData)

  const cfInstance = cf.ConversationalForm.startTheConversation(cfFormData);
});

/* const response = await fetch(jsonUrl);
const cfFormData = response.json();

const cfInstance = cf.ConversationalForm.startTheConversation(cfFormData);
*/

// End.
