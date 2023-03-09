<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a v-for="(period, index) in periods"
         :key="index"
         :class="{'is-active' : period === currentPeriod }"
         :data-test="period"
         @click="setPeriod(period)"> {{ period }}
      </a>
    </span>
    <time-line-post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      class="panel-block"/>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import moment from 'moment'
import { Post } from '@/mocks'
import TimeLinePost from '@/components/TimeLinePost.vue'
import { useStore } from '@/store'

type Period = 'Today' | 'This week' | 'This month';

// function delay () {
//   // eslint-disable-next-line promise/param-names
//   return new Promise(res => {
//     setTimeout(res, 2000)
//   })
// }

export default defineComponent({
  name: 'TimeLine',
  props: {
    msg: String
  },
  components: {
    TimeLinePost
  },
  async setup () {
    // await delay()
    const periods: Period[] = ['Today', 'This week', 'This month']
    const currentPeriod = ref<Period>('Today')
    const store = useStore()

    const allPosts: Post[] = store.getMockPosts().posts.ids.reduce<Post[]>((acc, id) => {
      const thePost = store.getMockPosts().posts.all.get(id)
      if (!thePost) {
        throw Error('The post was not found!')
      }
      return acc.concat(thePost)
    }, [])

    const posts = computed(() => {
      return allPosts.filter(post => {
        if (currentPeriod.value === 'Today') {
          return post.created.isAfter(moment().subtract(1, 'day'))
        }
        if (currentPeriod.value === 'This week') {
          return post.created.isAfter(moment().subtract(1, 'week'))
        }
        if (currentPeriod.value === 'This month') {
          return post.created.isAfter(moment().subtract(1, 'month'))
        }
        return false
      })
    })

    const setPeriod = (period: Period) => {
      currentPeriod.value = period
    }

    return {
      periods,
      setPeriod,
      currentPeriod,
      posts
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
