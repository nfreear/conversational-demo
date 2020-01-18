/**
 * Fix the accessibility of 'conversational-form', using WAI-ARIA, HTML5 & CSS.
 *
 * @see https://w3.org/TR/wai-aria-1.1/
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
 */

// Use a crude timeout!
const CF_FIX_TIMEOUT_MS = 5000;

const CF_ACCESSIBILITY_FIXES = [ {
    // Set a 'landmark' role and label on the HTML wrapper.
    "selector": ".conversational-form",
    "attributes": {
      "aria-label": "Conversational form widget.",
      "role": "form",
    }
  }, {
    // Make the message history log an ARIA 'Live Region'.
    "selector": ".conversational-form .scrollableInner",
    "attributes": {
      "aria-label": "Conversational log.",
      "aria-live": "polite",
      "role": "log",
    }
  }, {
    // Add an (aria-)label with text matching the 'placeholder' attribute.
    "selector": ".conversational-form .inputWrapper input",
    "attributes": {
      "type": "text",
      "aria-label": "Type your answer here ...",
      "tabindex": 0, // Prefer '0'
    }
  }, {
    // Ensure the 'button' is focussable with a keyboard.
    "selector": ".conversational-form .cf-input-button",
    "attributes": {
      "aria-label": "Submit post",
      "role": "button",
      "tabindex": 0, // Prefer '0'
    }
  },
];

setTimeout(() => {

  CF_ACCESSIBILITY_FIXES.forEach(fix => {
    const htmlElement = document.querySelector(fix.selector);

    for (const key in fix.attributes) {
      htmlElement.setAttribute(key, fix.attributes[ key ]);
    }
    // console.debug(htmlElement);
  });

  console.warn('Accessibility fixes applied:', CF_ACCESSIBILITY_FIXES);

}, CF_FIX_TIMEOUT_MS);

// End.
