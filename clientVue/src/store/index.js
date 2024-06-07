import { createStore } from 'vuex'
import photos from '@/store/photos.js'
import register from '@/store/register.js'
import login from '@/store/login'

const modules = {
    photos,
    register,
    login
    // kolejne moduły

}

export default createStore({
    modules,
})