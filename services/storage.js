import AsyncStorage from '@react-native-community/async-storage';
import { Cache } from "react-native-cache";

export class cacheStore {
    cache = null;

    //default expiry time is 1 week
    constructor(namespace, expiryTime = 604800) {
        this.cache = new Cache({
            namespace: namespace,
            policy: {
                maxEntries: 50000, // if unspecified, it can have unlimited entries
                stdTTL: expiryTime // the standard ttl as number in seconds, default: 0 (unlimited)
            },
            backend: AsyncStorage
        });
    }    
        
        set = async (key, value) => {
            await this.cache.set(key, value);
        }

        //Dont use this unless you want to extend the time its in cache.
        get = async (key) => {
            return await this.cache.get(key);
        }

        peek = async (key) => {
            return await this.cache.peek(key);
        }

        remove = async (key) => {
            return await this.cache.remove(key);
        }
}

export const getFromStorage = async (key) => {
    if(!key) { return null;}
        var value =  await AsyncStorage.getItem(key);
        return value;
}

export const promiseFromStorage = async (key) => {
    if(!key) {return null;}
    return await AsyncStorage.getItem(key);
}

export const setStorage = async (key, value) => {
    if(!key || !value) {return null;}
        return await AsyncStorage.setItem(key, value);
}

export const removeStorage = async (key) => {
    return await AsyncStorage.removeItem(key);
}