export namespace select {
  export function button(element: HTMLElement) {
    let buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = '';
      element.className = 'active';
    }
  }
}
