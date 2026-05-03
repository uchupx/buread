import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import localforage from "localforage";

import router from './router'
import App from './App.vue'
import './styles/main.css'

localforage.config({
    driver : localforage.INDEXEDDB,
    name: "readbuku",
    storeName: 'pinia-store',
})

const createLocalStorageAdapter = () => {
    return {
        async getItem(key: string): Promise<string | null> {
            return await localforage.getItem(key);
        },
        async setItem(key: string, value: string): Promise<void> {
            await localforage.setItem(key, value);
        },
        async removeItem(key: string): Promise<void> {
            await localforage.removeItem(key);
        },
        async clear(): Promise<void> {
            await localforage.clear();
        }
    };
};

// In main.ts

const pinia = createPinia();
pinia.use(createPersistedState({
    storage: createLocalStorageAdapter() as any
}));

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
