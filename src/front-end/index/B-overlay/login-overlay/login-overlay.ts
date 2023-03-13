import { select } from 'back-end/tools/select';
export namespace IndexLoginOverlay {
  export function eventsFor(blockName: String | 'login-overlay') {
    let loginButton = document.getElementById('login-button');
    let signupButton = document.getElementById('signup-button');
    $(loginButton).on('click', () => {
      select.button(loginButton);
    });
    $(signupButton).on('click', () => {
      select.button(signupButton);
    });

    console.log(`--${blockName} Loaded`);
    //--► console.log(`--${pageName} Loaded`); ◄--//
  }
}
