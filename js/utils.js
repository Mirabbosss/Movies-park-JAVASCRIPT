function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function createElement(tagName, classList, content) {
    const el = document.createElement(tagName);

    if(classList) {
        el.setAttribute("class", classList)
    }

    if(content) {
        el.innerHTML = content;
    }

    return el;
}