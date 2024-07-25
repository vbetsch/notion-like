import {Dispatch, SetStateAction} from "react";

// const _INTERNAL = {}
// const CONSTANTS = {}

const getData = (query: Promise<any>, setData: Dispatch<SetStateAction<any>>, setLoading?: Dispatch<SetStateAction<boolean>>, message?: string) => {
    setLoading && setLoading(true);
    query
        .then(data => {
            data ? setData(data.hello) : console.warn(message || 'No data were found');
        })
        .catch(e => {
            console.error(e)
        })
        .finally(() => {
            setLoading && setLoading(false)
        })
}

export const DATA = {
    // CONSTANTS,
    getData
}
