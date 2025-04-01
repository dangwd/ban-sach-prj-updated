<script setup>
import API from '@/api/api-main';
import { onMounted, ref } from 'vue';
import banner from '../../../assets/img/banner1.webp';
import banner2 from '../../../assets/img/banner2.webp';
import banner3 from '../../../assets/img/banner3.webp';
import ProductsGrid from '../components/ProductsGrid.vue';
import SlidesItem from '../components/SlidesItem.vue';
onMounted(() => {
    fetchAllProducts();
});
const Products = ref([]);
const SectionData = ref([
    {
        title: "Lễ tình nhân Valentine's Day",
        banner: banner
    },
    {
        title: 'COMBO',
        banner: banner2
    },
    {
        title: 'MANGA - COMIC',
        banner: banner3
    }
]);
const fetchAllProducts = async () => {
    try {
        const res = await API.get(`products?skip=0&limit=2000`);
        Products.value = res.data.metadata.result;
    } catch (error) {
        console.log(error);
    }
};
</script>
<template>
    <body class="font-montserrat text-sm bg-white dark:bg-zinc-900 flex flex-col gap-5">
        <SlidesItem></SlidesItem>
        <div class="flex flex-col gap-5">
            <section>
                <img :src="banner" alt="" />
            </section>
            <div class="text-2xl text-center uppercase font-semibold">Lễ tình nhân Valentine's Day</div>
            <div class="flex min-h-screen container mx-auto 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700">
                <div class="py-10">
                    <ProductsGrid :data="Products"></ProductsGrid>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-5">
            <section>
                <img :src="banner2" alt="" />
            </section>
            <div class="text-2xl text-center uppercase font-semibold">COMBO</div>
            <div class="flex min-h-screen container mx-auto 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700">
                <div class="py-10">
                    <ProductsGrid :data="Products"></ProductsGrid>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-5">
            <section>
                <img :src="banner3" alt="" />
            </section>
            <div class="text-2xl text-center uppercase font-semibold">MANGA - COMIC</div>
            <div class="flex min-h-screen container mx-auto 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700">
                <div class="py-10">
                    <ProductsGrid :data="Products"></ProductsGrid>
                </div>
            </div>
        </div>
    </body>
</template>
