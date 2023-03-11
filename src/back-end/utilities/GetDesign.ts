import { GetIndex } from './GetEvents';
export namespace GetDesign {
  const distURI: String = fetchURI(window.location.href);
  const pageName: String = window.location.href.split('/').pop().split('.')[0];

  export class forPage {
    constructor(blockName: String) {
      let block: String = blockName.split('-')[1];
      let blockElement: HTMLElement = document.querySelector(`#${pageName}-${block}`);
      $.get(`${distURI}/front-end/${pageName}/${findFolder(block)}/${blockName}/${blockName}.html`, function (callback) {
        applyStyle(blockElement, blockName);
        $(blockElement).html(callback);
        pageEvents(block, blockName);
      });
    }
  }

  function applyStyle(block: HTMLElement, pageName: String) {
    block.className = '';
    block.className = `${pageName}`;
  }
  function fetchURI(url: String) {
    //--|►| Online URI = Uniform Resource Identifier |◄|--//
    switch (url.slice(0, 5)) {
      case 'https':
        let href = url.split('/');
        //--► console.log('This page is Online'); ◄--//
        return `${href[0]}//${href[2]}/${href[3]}/dist`;
      case 'http:':
        //--► console.log('This page is Local'); ◄--//
        return '../../../dist';
    }
  }
  function findFolder(block: String) {
    switch (block) {
      case 'body':
        return `A-${block}`;
      case 'overlay':
        return `B-${block}`;
      case 'header':
        return `C-${block}`;
      case 'footer':
        return `D-${block}`;
      case 'leftbar':
        return `E-${block}`;
      case 'rightbar':
        return `F-${block}`;
      case 'main':
        return `G-${block}`;
      case 'data':
        return `H-${block}`;
    }
  }

  function pageEvents(block: String | 'body' | 'overlay' | 'header' | 'footer' | 'leftbar' | 'rightbar' | 'main' | 'data', blockName: String) {
    if (pageName === 'index') {
      switch (block) {
        case 'body':
          new GetIndex.forBody(blockName);
          break;
        case 'overlay':
          new GetIndex.forOverlay(blockName);
          break;
        case 'header':
          new GetIndex.forHeader(blockName);
          break;
        case 'footer':
          new GetIndex.forFooter(blockName);
          break;
        case 'leftbar':
          new GetIndex.forLeftbar(blockName);
          break;
        case 'rightbar':
          new GetIndex.forRightbar(blockName);
          break;
        case 'main':
          new GetIndex.forMain(blockName);
          break;
        case 'data':
          new GetIndex.forData(blockName);
          break;
      }
    }
    //--► console.log(`--${pageName} Loaded`); ◄--//
  }
}
