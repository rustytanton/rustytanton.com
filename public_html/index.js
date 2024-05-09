function handleWindowResize(elRoot, elAlert) {

    // set a CSS var for the alert height
    elRoot.style.setProperty('--alert-height', elAlert.offsetHeight + 'px');
}


window.addEventListener('load', () => {
    // cache elements so we're not querying the DOM over and over
    const elAlert = document.querySelector('.alert')
    const elRoot = document.querySelector(':root')

    // only add the event listener if the element exists
    if (elAlert) {
        document.body.classList.add('with-alert')

        // call on window resize
        window.addEventListener('resize', () => {
            handleWindowResize(elRoot, elAlert)
        })

        // call once on load
        handleWindowResize(elRoot, elAlert)
    }
})