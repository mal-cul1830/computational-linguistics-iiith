"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Storage {
    static get(key) {
        const found = localStorage.getItem(key);
        if (!found) {
            throw new Error('Failed to load');
        }
        return found;
    }
    static set(key, value) {
        localStorage.setItem(key, value);
    }
}
exports.default = Storage;
