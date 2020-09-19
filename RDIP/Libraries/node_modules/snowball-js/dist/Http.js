"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpMethods;
(function (HttpMethods) {
    HttpMethods["GET"] = "GET";
    HttpMethods["POST"] = "POST";
    HttpMethods["PATCH"] = "PATCH";
    HttpMethods["DELETE"] = "DELETE";
})(HttpMethods || (HttpMethods = {}));
class Http {
    static async request(method, url, body) {
        const rawResponse = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
            },
            body,
            credentials: 'include',
        });
        const response = await rawResponse.json();
        if (!response.data) {
            throw new Error(rawResponse.status.toString());
        }
        return response.data;
    }
    static get(url) {
        return Http.request(HttpMethods.GET, url);
    }
    static post(url, body) {
        const jsonBody = JSON.stringify(body);
        return Http.request(HttpMethods.POST, url, jsonBody);
    }
    static postWithoutBody(url) {
        return Http.request(HttpMethods.POST, url);
    }
    static patch(url, body) {
        const jsonBody = JSON.stringify(body);
        return Http.request(HttpMethods.PATCH, url, jsonBody);
    }
    static delete(url) {
        return Http.request(HttpMethods.DELETE, url);
    }
}
exports.default = Http;
