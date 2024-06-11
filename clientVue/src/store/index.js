import { createStore } from 'vuex'
import photos from '@/store/photos.js'
import register from '@/store/register.js'
import login from '@/store/login'
import upload from './postPhoto'
import profile from './updateProfile'
import tags from './tags'

const modules = {
    photos,
    register,
    login,
    upload,
    profile,
    tags,
    // kolejne moduły

}

export default createStore({
    modules,
})