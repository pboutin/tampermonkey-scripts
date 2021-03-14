// ==UserScript==
// @name         IAS & FCR PoD calculator
// @namespace    http://tampermonkey.net/
// @match        https://pathofdiablo.com/p/armory/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let fcr = 0;
    let ias = 0;

    document.querySelectorAll('#equipped .slot').forEach((slotElement) => {
        if (slotElement.classList.contains('sweapon1') || slotElement.classList.contains('sweapon2')) return;

        slotElement.querySelectorAll('.affix').forEach((affixElement) => {
            let fcrMatch = affixElement.textContent.match(/\+(\d+)% Faster Cast Rate/);
            if (fcrMatch) {
                const [_, rawFcr] = fcrMatch;
                fcr += parseInt(rawFcr, 10);
            }
    
            let iasMatch = affixElement.textContent.match(/\+(\d+)% Increased Attack Speed/);
            if (iasMatch) {
                const [_, rawIas] = iasMatch;
                ias += parseInt(rawIas, 10);
            }
        });
    });

    const bonusesList = document.querySelector('#gearbonus .bonus-list');
    if (!bonusesList) return;

    if (fcr) bonusesList.insertAdjacentHTML('beforeend', `<li><span class="value">+${fcr}%&nbsp;</span><span class="label">Fixed FCR</span></li>`);
    if (ias) bonusesList.insertAdjacentHTML('beforeend', `<li><span class="value">+${ias}%&nbsp;</span><span class="label">Fixed IAS</span></li>`);
})();
