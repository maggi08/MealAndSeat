import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: '503d351a-faab-4f0d-8b03-1ea984c50e74',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
 }

Vue.use(YmapPlugin, settings);