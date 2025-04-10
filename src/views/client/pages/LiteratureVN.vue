<template>
    <div class="h-auto container mx-auto py-10">
        <div class="grid grid-cols-12 gap-2">
            <div v-if="Products?.length > 0" class="col-span-12 flex flex-col gap-2">
                <div class="border border-gray-300 p-3 rounded-lg shadow">
                    <strong class="text-lg">Văn học Việt Nam</strong>
                </div>
                <ProductsGrid :data="Products"></ProductsGrid>
                <Paginator @page="onPageChange($event)" :rows="paginator.rows" :totalRecords="paginator.total"></Paginator>
            </div>
            <div class="col-span-9 text-center" v-else>Không có sản phẩm nào</div>
        </div>
    </div>
</template>
<script setup>
import API from '@/api/api-main';
import { onMounted, reactive, ref } from 'vue';
import ProductsGrid from '../components/ProductsGrid.vue';
const Products = ref([]);
const Brands = ref([]);
const paginator = reactive({
    rows: 10,
    page: 0,
    total: 0
});
const filter = reactive({
    price: '',
    genre: '',
    sex: '',
    age: ''
});
onMounted(() => {
    fetchAllProducts();
    fetchBrand();
});

const fetchAllProducts = async (query = '') => {
    let url = `products?skip=${paginator.page}&limit=${paginator.rows}`;
    if (query) {
        url += `${query}`;
    }
    try {
        const res = await API.get(url);
        Products.value = res.data.metadata.result;
        paginator.total = res.data.metadata.total;
    } catch (error) {
        console.log(error);
    }
};
const fetchBrand = async () => {
    try {
        const res = await API.get(`brands`);
        Brands.value = res.data.metadata;
    } catch (error) {}
};
const handleFilter = () => {
    let queryArr = [];
    if (filter.price) {
        queryArr.push(`&price=${filter.price}`);
    }
    if (filter.age) {
        queryArr.push(`&age=${filter.age}`);
    }
    if (filter.sex) {
        queryArr.push(`&sex=${filter.sex}`);
    }
    if (filter.genre) {
        queryArr.push(`&genre=${filter.genre}`);
    }
    let queryStr = queryArr.join('');
    fetchAllProducts(queryStr);
};
const onPageChange = (e) => {
    paginator.page = e.page;
    paginator.rows = e.rows;
    handleFilter();
};
</script>
<style></style>
