"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = delay;
exports.disableButtons = disableButtons;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function disableButtons(disabled) {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => btn.disabled = disabled);
}
