/**
 * Fix the accessibility of 'conversational-form', using WAI-ARIA, Javascript, CSS & HTML5.
 *
 * @TODO These fixes are incomplete! You need to arrange accessibility testing.
 *
 * @license MIT
 * @author © Nick Freear <https://nick.freear.org.uk>
 *
 * @see https://w3.org/TR/wai-aria-1.1/
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
 */

// Configuration - use a crude timeout!
const TIMEOUT_MS = 5000;
const APPLY_SELECTOR = 'script[ src *= accessibility-fixes ][ src *= apply ]';
const setTimeout = window.setTimeout;
const DOC = window.document;

// ------------------------------------------------------------
// An array of fixes, with CSS selectors.

export const ACCESSIBILITY_FIXES = [ {
    // Set a 'landmark' role and label on the HTML wrapper.
    "selector": ".conversational-form",
    "attributes": {
      "aria-label": "Conversational form widget.",
      "role": "form",
    }
  }, {
    // Make the message history log an ARIA 'Live Region' (for screen readers users)
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

export function applyFixes(timeoutMs) {
  setTimeout(() => {

    ACCESSIBILITY_FIXES.forEach(fix => {
      const htmlElement = DOC.querySelector(fix.selector);

      if (htmlElement) {
        for (const key in fix.attributes) {
          htmlElement.setAttribute(key, fix.attributes[ key ]);
        }
      } else {
        console.warn('Warning, timeout? Accessibility fix not applied:', fix);
      }
    });

    console.debug('Accessibility fixes applied:', ACCESSIBILITY_FIXES);

  }, timeoutMs || TIMEOUT_MS);
}

// ------------------------------------------------------------

if (DOC.querySelector(APPLY_SELECTOR)) {
  window.addEventListener('load', () => applyFixes()); // Not: doc..DOMContentLoaded?
}

// End.
