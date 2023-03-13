import { select } from 'back-end/tools/select';

export namespace IndexLoginHeader {
  export function eventsFor(blockName: String | 'login-header') {
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
