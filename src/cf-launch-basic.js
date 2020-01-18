

(function cfLaunch (DOC, LOC) {

  const $HTML_FORM_ELEMENT = DOC.querySelector('#cf-form-0');
  const $FORM_INPUTS = [...DOC.forms[0].elements];

  $HTML_FORM_ELEMENT.addEventListener('submit', EV => {
    EV.preventDefault();

    console.warn('>> Form submit event:', EV)

    const VALUES = $FORM_INPUTS.map(elem => { return { f: elem.name, v: elem.value || null } });

    console.warn('  > Form data:', VALUES);

    // $FORM_INPUTS.forEach(elem => console.warn(`  > ${ elem.name } := '${ elem.value }'`));
  });

  if (LOC.href.match(/disable=cf/)) {
    return console.warn('>> Conversation-form disabled!');
  }

  const CF_DISPATCHER = new cf.EventDispatcher();

  CF_DISPATCHER.addEventListener(cf.FlowEvents.USER_INPUT_INVALID, EV => {
    console.error('Invalid input:', EV);

    const ORIG_EL = EV.detail.tag.domElement;
    const CHAT_EL = EV.detail.input.el;

    CHAT_EL.title = `Sorry. I'm expecting for example: ${ ORIG_EL.placeholder }.`;
  });

  const CF = new cf.ConversationalForm({
    formEl: $HTML_FORM_ELEMENT,
    eventDispatcher: CF_DISPATCHER,
    theme: 'dark',
    suppressLog: false,
    // submitCallback: EV => console.warn('>> CF.submitCallback:', EV),
    // tags: [ { tag: 'input', type: 'text', value: 'Pre-filled ..', 'cf-label': 'Label ..' } ],
  });

})(window.document, window.location);
