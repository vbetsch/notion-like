import {FETCH} from "../services/fetch";
import {HttpMethods} from "../types/HttpMethods";

const _INTERNAL = {
    BASE_URL: "/api",
}

const CONSTANTS = {
    URI: {
        HELLO_WORLD: "/hello"
    }
}

const _doAPIDataFromUrl = async (url: string, infoText: string, options: RequestInit): Promise<unknown> => {
    const result = await FETCH.fetchJsonByUrl(url, options);
    console.info(`(${url}) INFO: ${infoText}`);
    return result;
};

const getAPIDataFromUrl = async (url: string, infoText: string): Promise<any> => {
    const options: RequestInit = {
        method: HttpMethods.GET,
        headers: {
            accept: 'application/json',
        },
    };
    return await _doAPIDataFromUrl(_INTERNAL.BASE_URL + url, infoText, options);
};

const postAPIDataFromUrl = async (url: string, infoText: string, body?: any): Promise<any> => {
    const options: RequestInit = {
        method: HttpMethods.POST,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return await _doAPIDataFromUrl(_INTERNAL.BASE_URL + url, infoText, options);
};

export const CONFIG = {
    CONSTANTS,
    getAPIDataFromUrl,
    postAPIDataFromUrl
}
