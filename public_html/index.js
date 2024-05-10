/* global window, document */

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

        // call on window resize
        window.addEventListener('resize', () => {
            handleWindowResize(elRoot, elAlert)
        })

        // call once on load
        handleWindowResize(elRoot, elAlert)

        // now that --alert-height is set, can make the alert position: fixed
        document.body.classList.add('with-alert')
    }
})

// committing with an error initially to make sure the github action
// does not deploy when a lint error is found
intentional_lint_error>