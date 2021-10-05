const nameField = document.getElementById('name').focus();
const jobRole = document.getElementById('title');
const otherJob = document.getElementById('other-job-role');
otherJob.hidden = true;


jobRole.addEventListener('change', e => {
    if (e.target.value === 'other') {
       otherJob.hidden = false;
    } else {
        otherJob.hidden = true;
    }
});

const designSelect = document.getElementById('design');
const color = document.getElementById('color');
color.disabled = true;
const colorSelect = document.getElementById('color').children;

/** This event handler  */
designSelect.addEventListener('change', e => {
    color.disabled = false;
    for (let i = 1; i < colorSelect.length; i++) {
        let eTarget = e.target.value;
        let dataTheme = colorSelect[i].getAttribute('data-theme');
        if (eTarget === dataTheme) {
            colorSelect[i].hidden = false;
            colorSelect[i].setAttribute('selected', true);
        } else {
            colorSelect[i].hidden = true;
            colorSelect[i].removeAttribute('selected');
        }
    }
});