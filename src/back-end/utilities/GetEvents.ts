//--|▼| Import Index |▼|--//
import { IndexDefaultBody } from 'front-end/index/A-body/default-body/default-body';
import { IndexLoginBody } from 'front-end/index/A-body/login-body/login-body';
import { IndexDefaultOverlay } from 'front-end/index/B-overlay/default-overlay/default-overlay';
import { IndexDefaultHeader } from 'front-end/index/C-header/default-header/default-header';
import { IndexDefaultFooter } from 'front-end/index/D-footer/default-footer/default-footer';
import { IndexDefaultLeftbar } from 'front-end/index/E-leftbar/default-leftbar/default-leftbar';
import { IndexDefaultRightbar } from 'front-end/index/F-rightbar/default-rightbar/default-rightbar';
import { IndexDefaultMain } from 'front-end/index/G-main/default-main/default-main';
import { IndexDefaultData } from 'front-end/index/H-data/default-data/default-data';
//--|▲| Import Index |▲|--//

export namespace GetIndex {
  //--▼ index-body ▼--//
  export function forBody(blockName: String) {
    switch (blockName) {
      case 'default-body':
        IndexDefaultBody.eventsFor(blockName);
        break;
      case 'login-body':
        IndexLoginBody.eventsFor(blockName);
        break;
    }
    //--► console.log(`--${blockName} Loaded`); ◄--//
  }

  //--▼ index-overlay ▼--//
  export function forOverlay(blockName: String) {
    switch (blockName) {
      case 'default-overlay':
        IndexDefaultOverlay.eventsFor(blockName);
        break;
    }
    //--► console.log(`--${blockName} Loaded`); ◄--//
  }

  //--▼ index-header ▼--//
  export function forHeader(blockName: String) {
    switch (blockName) {
      case 'default-header':
        IndexDefaultHeader.eventsFor(blockName);
        break;
    }
    //--► console.log(`--${blockName} Loaded`); ◄--//
  }
  //--▼ index-footer ▼--//
  export function forFooter(blockName: String) {
    switch (blockName) {
      case 'default-footer':
        IndexDefaultFooter.eventsFor(blockName);
        break;
    }
    //--► console.log(`--${blockName} Loaded`); ◄--//
  }

  //--▼ index-leftbar ▼--//
  export function forLeftbar(blockName: String) {
    switch (blockName) {
      case 'default-leftbar':
        IndexDefaultLeftbar.eventsFor(blockName);
        break;
    }
    //--► console.log(`--${blockName} Loaded`); ◄--//
  }

  //--▼ index-rightbar ▼--//
  export function forRightbar(blockName: String) {
    switch (blockName) {
      case 'default-rightbar':
        IndexDefaultRightbar.eventsFor(blockName);
        break;
    }
    //--► console.log(`--${blockName} Loaded`); ◄--//
  }

  //--▼ index-main ▼--//
  export function forMain(blockName: String) {
    switch (blockName) {
      case 'default-main':
        IndexDefaultMain.eventsFor(blockName);
        break;
    }
    //--► console.log(`--${blockName} Loaded`); ◄--//
  }

  //--▼ index-data ▼--//
  export function forData(blockName: String) {
    switch (blockName) {
      case 'default-data':
        IndexDefaultData.eventsFor(blockName);
        break;
    }
    //--► console.log(`--${blockName} Loaded`); ◄--//
  }
}
