export default [
    {
        path: '/client',
        component: () => import('@/views/client/layouts/AppLayout.vue'),
        children: [
            {
                path: '/client',
                name: 'home',
                component: () => import('@/views/client/pages/HomePage.vue')
            },
            {
                path: '/client/new-products',
                name: 'new-products',
                component: () => import('@/views/client/pages/NewProducts.vue')
            },
            {
                path: '/client/products-list',
                name: 'products-list',
                component: () => import('@/views/client/pages/ProductsList.vue')
            },
            {
                path: '/client/detail/:id',
                name: 'item-detail',
                component: () => import('@/views/client/pages/ProductDetail.vue')
            },
            {
                path: '/client/payment',
                name: 'payment',
                component: () => import('@/views/client/pages/Payment.vue')
            },
            {
                path: '/client/order-list',
                name: 'orderlist',
                component: () => import('@/views/client/pages/OrderList.vue')
            },
            {
                path: '/client/payment-ing',
                name: 'payment-ing',
                component: () => import('@/views/client/pages/PaymentPage.vue')
            },
            {
                path: '/client/manga-comics',
                name: 'manga-comics',
                component: () => import('@/views/client/pages/MangaComic.vue')
            },
            {
                path: '/client/literature-vn',
                name: 'literature-vn',
                component: () => import('@/views/client/pages/LiteratureVN.vue')
            },
            {
                path: '/client/literature-foreign',
                name: 'literature-foreign',
                component: () => import('@/views/client/pages/LiteratureForeign.vue')
            },
            {
                path: '/client/payment-check',
                name: 'payment-check',
                component: () => import('@/components/PaymentSuccess.vue')
            }
        ]
    }
];
