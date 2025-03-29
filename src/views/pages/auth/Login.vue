<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { useAuthStore } from '@/store';
import { useToast } from 'primevue/usetoast';
import { getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance();

const toast = useToast();
const store = useAuthStore();
const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const checked = ref(false);
const loginForm = ref(true);
const handleLogin = async () => {
    const data = {
        username: username.value,
        password: password.value
    };
    const res = await store.login(data);
    if (res.status === 1) {
        router.push({ name: 'home' });
    } else {
        proxy.$notify('E', res, toast);
    }
};

const handleRegister = async () => {
    const data = {
        name: username.value,
        email: email.value,
        password: password.value
    };
    const res = await store.register(data);
    if (res.status === 1) {
        proxy.$notify('S', 'Tạo tài khoản thành công!', toast);
    } else {
        console.log(res);
        proxy.$notify('E', 'Có lỗi xảy ra!', toast);
    }
};
</script>

<template>
    <FloatingConfigurator />
    <Toast />
    <!-- <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <div class="dark:text-surface-0 text-2xl text-primary font-medium mb-4">Welcome to BookStore!</div>
                        <span class="text-muted-color font-medium">{{ loginForm ? `Đăng nhập để tiếp tục!` : `Đăng ký tài khoản` }}</span>
                    </div>

                    <div v-if="loginForm">
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-base font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="username" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-base mb-2">Mật khẩu</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Nhớ mật khẩu</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Quên mật khẩu?</span>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <Button label="Đăng nhập" class="w-full" @click="handleLogin()"></Button>
                            <Button label="Đăng ký" text class="w-full" @click="loginForm = !loginForm"></Button>
                        </div>
                    </div>

                    <div v-else>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-base font-medium mb-2">Tên người dùng</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="username" />
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-base font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-base mb-2">Mật khẩu</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Nhớ mật khẩu</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Quên mật khẩu?</span>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <Button label="Đăng ký" class="w-full" @click="handleRegister()"></Button>
                            <Button label="Trở lại đăng nhập!" text class="w-full" @click="loginForm = !loginForm"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="w-1/2 min-h-screen flex items-center justify-center bg-primary-100">
            <img src="@/assets/img/logo_login.jpg" alt="login-bg" class="w-[70%] h-[70%] object-cover" />
        </div>
        <div class="w-1/2 min-h-screen px-48 py-14 bg-white flex items-center">
            <div class="w-full">
                <h3 class="text-zinc-900 font-medium">Xin chào bạn</h3>
                <h1 class="text-zinc-900 text-3xl">Đăng nhập để tiếp tục</h1>

                <div class="flex flex-col gap-5 mt-10">
                    <FloatLabel variant="in">
                        <InputText id="email" v-model="username" class="h-16 w-full !text-xl" />
                        <label class="text-lg" for="email">Số điện thoại hoặc email</label>
                    </FloatLabel>
                    <FloatLabel variant="in" class="mt-2">
                        <Password fluid id="password" v-model="password" class="h-16 !text-xl" toggleMask />
                        <label class="text-lg" for="password">Mật khẩu</label>
                    </FloatLabel>
                    <Button @click="handleLogin()" label="Đăng nhập" class="w-full h-16 !text-xl mt-2" />
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <Checkbox v-model="size" inputId="size_large" name="size" binary size="large" />
                            <label for="size_large" class="text-lg">Quên mật khẩu</label>
                        </div>
                        <router-link to="/" class="text-primary text-xl font-light hover:underline">Quên mật khẩu?</router-link>
                    </div>
                    <div class="flex items-center gap-2">
                        <hr class="w-full" />
                        <span class="text-zinc-400 text-xl">Hoặc</span>
                        <hr class="w-full" />
                    </div>

                    <Button variant="outlined" class="w-full h-16 !text-xl mt-2" severity="contrast">
                        <!-- <img src="~/assets/img/icon_logo_google.png" alt="login-bg" class="w-[25px] h-[25px] object-cover" /> -->
                        Đăng nhập với Google
                    </Button>
                    <div class="text-zinc-600 text-xl text-center">Bạn chưa có tài khoản? <router-link to="/auth/signup" class="text-primary font-medium">Đăng ký ngay</router-link></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
