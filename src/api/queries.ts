import {CONFIG} from "./config";
import {HelloType} from "./types";

// const _INTERNAL = {}
// const CONSTANTS = {}

const getHelloWorld = async (): Promise<HelloType> => {
    return await CONFIG.getAPIDataFromUrl(CONFIG.CONSTANTS.URI.HELLO_WORLD, 'Get hello world');
}

export const QUERIES = {
    // CONSTANTS
    getHelloWorld
}
