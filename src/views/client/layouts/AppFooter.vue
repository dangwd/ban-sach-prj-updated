<template>
    <div class="container mx-auto h-auto p-3">
        <div class="grid grid-cols-12 gap-2">
            <div class="col-span-3 flex flex-col gap-3">
                <strong class="uppercase">Dịch vụ</strong>
                <span>Điều khoản sử dụng</span>
                <span>Chính sách bảo mật</span>
                <span>Liên hệ</span>
                <span>Hệ thống nhà sách</span>
                <span>Tra cứu đơn hàng</span>
            </div>
            <div class="col-span-3 flex flex-col gap-3">
                <strong class="uppercase">Hỗ trợ</strong>
                <span>Hướng dẫn đặt hàng</span>
                <span>Chính sách đổi trả - hoàn tiền</span>
                <span>Phước thức thanh toán</span>
                <span>Chính sách khách hàng mua sỉ</span>
            </div>
            <div class="col-span-3 flex flex-col gap-3">
                <strong class="uppercase">Nhà xuất bản</strong>
                <span>Địa chỉ: Số 55 Quang Trung, Nguyễn Du, Hai Bà Trưng, Hà Nội</span>
                <span>Số điện thoại: (+84) 1900571595</span>
                <span>Email: cskh_online@nxbkimdong.com.vn</span>
            </div>
            <div class="col-span-3 flex flex-col gap-3">
                <strong class="uppercase">Kết nối mạng xã hội</strong>
                <img height="200" width="200" src="../../../assets/img/3.png" alt="" />

                <div class="flex flex-col gap-3">
                    <div class="flex justify-between w-[70%]">
                        <img v-for="i in socialMedia" width="30" class="object-cover rounded-lg" :src="i" alt="" />
                    </div>
                </div>
            </div>
            <!-- <div class="col-span-7 flex flex-col gap-3">
                <img height="200" width="200" src="../../../assets/img/3.png" alt="" />
                <strong>N</strong>
            </div>
            <div class="col-span-5">
                <div class="flex flex-col gap-3">
                    <span class="text-xl font-semibold text-primary">Follow Us</span>
                    <div class="flex justify-between w-[50%]">
                        <img v-for="i in socialMedia" width="40" class="object-cover rounded-lg" :src="i" alt="" />
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const socialMedia = ref([
    'https://cdn-icons-png.flaticon.com/256/124/124010.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/640px-Instagram_icon.png',
    'https://static-00.iconduck.com/assets.00/tiktok-icon-1890x2048-ihin0vop.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png'
]);
</script>
<style></style>
