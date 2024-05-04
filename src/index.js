document.getElementById('btn-nav').addEventListener('click', toggleNav)

function toggleNav(){
    const divMobileLinks = document.getElementById('mobile-links')

    divMobileLinks.classList.toggle('close-mobile-links')
}