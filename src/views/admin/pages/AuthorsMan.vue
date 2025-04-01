<script setup>
import API from '@/api/api-main';
import { useToast } from 'primevue/usetoast';
import { getCurrentInstance, onMounted, ref } from 'vue';
const { proxy } = getCurrentInstance();
onMounted(() => {
    fetchAll();
});

const formData = new FormData();
const toast = useToast();
const dt = ref();
const Authors = ref();
const authorDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const authorDetail = ref({});
const selectedProducts = ref();

const submitted = ref(false);

const fetchAll = async () => {
    try {
        const res = await API.get(`author?skip=0&limit=20`);
        Authors.value = res.data.metadata.result;
    } catch (error) {
        console.log(error);
    }
};

const openNew = async (data = '') => {
    authorDetail.value = {};
    if (data) {
        try {
            const res = await API.get(`author/${data._id}`);
            authorDetail.value = res.data.metadata;
        } catch (error) {
            console.log(error);
        }
    }
    submitted.value = false;
    authorDialog.value = true;
};

function hideDialog() {
    authorDialog.value = false;
    submitted.value = false;
}

const saveAuthor = async () => {
    submitted.value = true;
    let data = { ...authorDetail.value };
    if (!validateData(data)) return;
    formData.append('items', JSON.stringify(data));
    let API_EP = data._id ? API.updatev2(`author/${data._id}`, formData) : API.create(`author`, formData);
    try {
        const res = await API_EP;
        if (res.data.metadata) {
            proxy.$notify('S', 'Thành công!', toast);
            authorDialog.value = false;
        }
    } catch (error) {
        console.log(error);
    } finally {
        formData.delete('images');
        formData.delete('items');
        fetchAll();
    }
};
const validateData = (data) => {
    if (!data.authorName) {
        proxy.$notify('E', 'Vui lòng nhập tên tác giả!', toast);
        return false;
    }
    return true;
};
const deleteActorDlg = (data) => {
    authorDetail.value = data;
    deleteProductDialog.value = true;
};

const confirmDeleteSelected = async () => {
    try {
        const res = await API.delete(`author/${authorDetail.value._id}`);
        if (res.data) {
            deleteProductDialog.value = false;
        }
    } catch (error) {
        console.log(error);
    } finally {
        fetchAll();
    }
};

const Openfile = () => {
    document.querySelectorAll('.click-file')[0].click();
};
const UploadFileLocal = async (event, index) => {
    const file = event.target.files[0];
    formData.append('images', file);
    document.querySelectorAll('.click-file')[index].value = '';
};
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <strong class="text-lg">Danh sách Tác giả</strong>
                </template>
                <template #end>
                    <Button label="Thêm mới" icon="pi pi-plus" @click="openNew()" />
                </template>
            </Toolbar>

            <DataTable ref="dt" showGridlines :value="Authors" dataKey="id" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 25]">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Danh Sách Tác giả</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText class="w-[300px]" placeholder="Tìm kiếm theo tên..." />
                        </IconField>
                    </div>
                </template>
                <Column header="STT">
                    <template #body="sp">
                        {{ sp.index + 1 }}
                    </template>
                </Column>
                <Column field="authorName" header="Tên tác giả"></Column>
                <Column field="images" header="Ảnh">
                    <template #body="sp">
                        <Image crossorigin="anonymous" width="80" :src="sp.data.images"></Image>
                    </template>
                </Column>
                <Column style="max-width: 400px" header="Mô tả">
                    <template #body="{ data }">
                        <span class="line-clamp-3">{{ data.authorDescription }}</span>
                    </template>
                </Column>
                <Column field="" header="Thao tác">
                    <template #body="sp">
                        <div class="flex gap-2">
                            <Button @click="openNew(sp.data)" text icon="pi pi-eye"></Button>
                            <Button @click="deleteActorDlg(sp.data)" text icon="pi pi-trash" severity="danger"></Button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="authorDialog" :style="{ width: '60%' }" header="Tác giả" :modal="true">
            <div class="grid grid-cols-12 gap-3">
                <div class="col-span-3 flex flex-col gap-2">
                    <Image width="300" crossorigin="anonymous" :src="authorDetail?.images ? authorDetail.images : `https://placehold.co/300x300`"></Image>
                    <Button label="Tải lên" icon="pi pi-cloud-upload" class="btn-up-file" raised @click="Openfile(index)" />
                    <input type="file" class="hidden click-file" @change="UploadFileLocal($event, 0)" />
                </div>
                <div class="col-span-9">
                    <div class="flex flex-col gap-2"></div>
                    <div class="flex flex-col gap-2">
                        <label for="name" class="block font-bold">Tên tác giả</label>
                        <InputText id="name" v-model.trim="authorDetail.authorName" required="true" autofocus :invalid="submitted && !authorDetail.authorName" fluid />
                        <small v-if="submitted && !authorDetail.authorName" class="text-red-500">movieName is required.</small>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="movieDescription" class="block font-bold">Mô tả</label>
                        <Textarea id="movieDescription" v-model="authorDetail.authorDescription" required="true" rows="3" cols="20" fluid />
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Hủy" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Xác nhận" icon="pi pi-check" @click="saveAuthor" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="authorDetail"
                    >Xác nhận xóa <b>{{ authorDetail.actorName }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="Hủy" icon="pi pi-times" severity="secondary" @click="deleteProductDialog = false" />
                <Button label="Xác nhận" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" />
            </template>
        </Dialog>
    </div>
</template>
