/*!
  ..
*/

const CF_LAUNCH_OPT = window.CF_LAUNCH_OPTIONS;
const M_PARAM = window.location.href.match(/id=(\w+)/);

const formId = M_PARAM ? M_PARAM[ 1 ] : 'default';

let jsonUrl;
if (formId in CF_LAUNCH_OPT.jsonFiles) {
  jsonUrl = CF_LAUNCH_OPT.jsonFiles[ formId ];
} else {
  jsonUrl = CF_LAUNCH_OPT.jsonFiles.default;
}

fetch(jsonUrl).then(resp => resp.json()).then(cfFormData => {
  console.warn('CF form data:', cfFormData)

  const cfInstance = window.cf.ConversationalForm.startTheConversation(cfFormData);
});

/*
const response = await fetch(jsonUrl);
const cfFormData = response.json();

const cfInstance = window.cf.ConversationalForm.startTheConversation(cfFormData);
*/

// End.
