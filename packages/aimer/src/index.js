// eslint-disable-next-line import/no-unassigned-import
import './polyfills'
import Vue from 'vue'
import slugo from 'slugo'
import AimerVue from './AimerVue'
import AimerRoot from './Aimer.vue'

if (typeof window !== 'undefined') {
  window.AIMER_VERSION = process.env.AIMER_VERSION
}

export default class Aimer {
  constructor({ adapter: Adapter = AimerVue, ...config } = {}) {
    this.Adapter = Adapter
    this.stories = []
    this.config = config
  }

  add(story) {
    this.stories.push({
      ...story,
      slug: slugo(story.title)
    })
    return this
  }

  start(target) {
    if (typeof target === 'string') {
      target = document.querySelector(target)
    }

    this.vm = new Vue({
      el: target,
      render: h =>
        h(AimerRoot, {
          props: {
            Adapter: this.Adapter,
            stories: this.stories,
            config: this.config
          }
        })
    })

    return this.vm
  }
}
