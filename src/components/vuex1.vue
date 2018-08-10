<template>
    <div class='vuex1'>
        <p>{{$store.state.count}}</p>
        <group title='mini button'>
            <x-button mini type='primary' @click.native='add'>+</x-button>
            <x-button mini type='primary' @click.native='reduce'>-</x-button>
        </group>
        <group title='手动设置text'>
            <x-input title='设置text' placeholder="请输入" v-model='text'></x-input>
            <x-input title='设置text2' placeholder="请输入" v-model='abc.text'></x-input>
        </group>
        <x-button @click.native='setValue(text)'>setCount</x-button>
        <x-button @click.native='setObject()'>setObject</x-button>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import store from '../assets/js/store.js'

export default {
    name: 'vuex1',
    store,
    data () {
        return {
            text: '',
            abc: {
                text: ''
            }
        }
    },
    methods: {
        ...mapMutations([
            'add','reduce','setValue','setObj'
        ]),
        setObject() {
            this.setObj(this.abc);
        }
    }
}
</script>

<style>

</style>
