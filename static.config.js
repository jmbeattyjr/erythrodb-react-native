import axios from 'axios'

import { getSingleFileYaml } from './src/lib/utils/fileLoading';

export default {
  getSiteData: () => ({
    title: 'React Static'
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const home = getSingleFileYaml("./src/data/pages/home.yml");
    // const other = getSingleFileYaml("./src/data/pages/other.yml");
    // const contact = getSingleFileYaml("./src/data/pages/contact.yml");

    return [
      {
        path: '/',
        component: 'src/components/home/Home',
        getData: ()=> ({
          home
        })
      },
      {
        path: '/simulator',
        component: 'src/components/simulator/Simulator'
      },
      {
        path: '/bibliome',
        component: 'src/components/bibliome5/Bibliome'
      },

      {
        path: '/cellMap',
        component: 'src/components/cellMap/CellMap'
      },
      {
        path: '/dataRepo',
        component: 'src/components/dataRepo/DataRepo',
        getData: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post
          })
        }))
      },
      {
        is404: true,
        component: 'src/containers/404'
      }
    ]
  }
}
