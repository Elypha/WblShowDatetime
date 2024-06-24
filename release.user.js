// ==UserScript==
// @name        显示开售时间
// @namespace   https://github.com/Elypha/WblShowDatetime
// @match       https://jx3.seasunwbl.com/buyer*
// @grant       none
// @version     1.0
// @author      -
// @description 6/24/2024, 9:11:06 PM
// ==/UserScript==

(function () {
    function reveal_true_time(element, now) {
        // set parent div to inline
        const parent_element = element.parentElement;
        if (parent_element.querySelector('.sell_in_date')) {
            return;
        }

        parent_element.style.display = 'inline';
        parent_element.style.textAlign = 'center';

        // new span
        const true_date = document.createElement('span');
        sell_in_ms = parseInt(element.getAttribute('seed')) * 1000
        sell_in_date = new Date(now + sell_in_ms)

        true_date.className = 'sell_in_date';
        true_date.innerText = get_date_string(sell_in_date)
        parent_element.appendChild(true_date)
    }

    function get_date_string(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function main() {
        const now = Date.now()
        console.log(now)

        span_sell_in = document.querySelectorAll('span[seed]')
        span_sell_in.forEach(element => {
            reveal_true_time(element, now)
        });
    }


    // add observer
    const observer = new MutationObserver(() => {
        const element = document.querySelector('span[seed]');
        if (element) {
            // if '
            // Stop observing
            // observer.disconnect();
            main();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // add style
    function add_style() {
        const style = document.createElement('style');
        style.innerHTML = `
        .sell_in_date {
            display: block;
            margin-top: 8px;
            color: #149ea8;
        }
        `;
        document.head.appendChild(style);
    }
    add_style();
})();
