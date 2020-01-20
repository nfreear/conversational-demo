/**
 * Load form-structure from a JSON file, and create a 'conversational-form'.
 *
 * @see https://space10-community.github.io/conversational-form/docs/1.0.0/functionality/formless/
 */

import { CFL_CONFIG } from './cfl-config.js';

const cf = window.cf;
const fetch = window.fetch;
// Was: const CF_LAUNCH_OPT = window.CF_LAUNCH_OPTIONS;

const formId = param(CFL_CONFIG.formId);
const theme  = param(CFL_CONFIG.theme);
const formJsonUrl = CFL_CONFIG.jsonUrls[ formId ];

const cfDispatcher = new cf.EventDispatcher();

fetch(formJsonUrl).then(resp => resp.json()).then(cfFormData => {
  cfFormData.options = CFL_CONFIG.cfOptions;
  cfFormData.options.theme = theme;
  cfFormData.options.submitCallback = submitCallback;
  cfFormData.options.eventDispatcher= cfDispatcher;

  console.warn('CF form data:', cfFormData)

  const cfInstance = cf.ConversationalForm.startTheConversation(cfFormData);
});

let updateCount = 0;

// https://space10-community.github.io/conversational-form/docs/1.0.0/events/
cfDispatcher.addEventListener(cf.FlowEvents.FLOW_UPDATE, EV => {
  if (updateCount == 0) {
    console.warn('CF is loaded!');

    document.body.className += ' cfl-is-loaded';
  }

  console.debug(`> Flow update ${ updateCount }:`, EV);
  updateCount++;
});

function submitCallback(cfResult) {
  console.debug('submitCallback:', cfResult);

  const FORM_ELEMS = [...cfResult.formEl.elements];

  const FORM_VALUES = FORM_ELEMS.map(elem => {
    if (/select-multiple/.test(elem.type)) {
      return { f: elem.name, v: [...elem.selectedOptions].map(opt => opt.value) };
    } else {
      return { f: elem.name, v: elem.value || null };
    }
   });

  console.warn('Form values:', FORM_VALUES);
}

function param(paramData) {
  const matches = window.location.search.match(new RegExp(paramData.regex));

  return matches ? matches[ 1 ] : paramData.default;
}

// End.
