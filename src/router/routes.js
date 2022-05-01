const routes = [{
        path: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                path: '',
                component: () =>
                    import ('pages/Home')
            },
            {
                path: '/books',
                component: () =>
                    import ('pages/books')
            },
          {
            path: '/schools',
            component: () =>
              import ('pages/schools')
          }
        ]
    },


    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/ErrorNotFound.vue')
    }
]

export default routes
