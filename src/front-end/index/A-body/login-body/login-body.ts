import { GetDesign } from 'back-end/utilities/GetDesign';

export namespace IndexLoginBody {
  export function eventsFor(pageName: String | 'login-body') {
    // new GetDesign.forPage('login-overlay');
    // new GetDesign.forPage('default-header');
    // new GetDesign.forPage('default-footer');
    // new GetDesign.forPage('rain-leftbar');
    // new GetDesign.forPage('rain-rightbar');
    new GetDesign.forPage('gradient-main');
    // new GetDesign.forPage('login-data');

    console.log(`--${pageName} Loaded`);
    //--► console.log(`--${pageName} Loaded`); ◄--//
  }
}
