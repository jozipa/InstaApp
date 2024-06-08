import { createStore } from 'vuex'
import photos from '@/store/photos.js'
import register from '@/store/register.js'
import login from '@/store/login'
import upload from './postPhoto'

const modules = {
    photos,
    register,
    login,
    upload
    // kolejne moduły

}

export default createStore({
    modules,
})