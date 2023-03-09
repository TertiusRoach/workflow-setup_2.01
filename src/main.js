//--|►| RequireJS (Workflow Setup) |◄|--//
require(['main'], () => {
  //--|▼| Find pageName |▼|--//
  const pageName = window.location.href.split('/').pop().split('.')[0];

  let fontAwesomePro = 'dist/vendors/font-awesome/js/all.min.js'; //--|◄| Font Awesome Pro (5.13.0) |◄|--//
  let jQuery = 'https://code.jquery.com/jquery-3.6.0.min.js'; //--|◄| jQuery (3.6.0) |◄|--//
  let main = `dist/front-end/${pageName}/${pageName}.js`;

  require([fontAwesomePro, jQuery, main]);
  //--► console.log('--main.js Loaded'); ◄--//
});
