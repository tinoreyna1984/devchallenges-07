let hamburgerButton = document.querySelector('#menu');
let nav = document.querySelector('nav');
let menuOpened = false;

hamburgerButton.onclick = () => {
    /* First we need to make sure we are in the right device */
    if(!window.matchMedia("(max-width: 991.50px)").matches) return;

    if(!menuOpened){ /* open menu */
        menuOpened = true;
        nav.classList.add("mobile-menu");
        hamburgerButton.textContent = " close ";
    }
    else{ /* close menu */
        menuOpened = false;
        nav.classList.remove("mobile-menu");
        hamburgerButton.textContent = " menu ";
    }
}
