import { createStore } from 'vuex'
import photos from '@/store/photos.js'
import register from '@/store/register.js'

const modules = {
    photos,
    register
    // kolejne moduły

}

export default createStore({
    modules,
})