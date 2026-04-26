<template>
  <div class="row justify-center items-center" style="min-height: 100vh">
    <div class="col-12 col-sm-6 col-md-4">
      <q-card>
        <q-card-section>
          <div class="text-h5 text-center">Вход в систему</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="form.login"
              label="Логин"
              lazy-rules
              :rules="[val => !!val || 'Обязательное поле']"
            />

            <q-input
              v-model="form.password"
              type="password"
              label="Пароль"
              lazy-rules
              :rules="[val => !!val || 'Обязательное поле']"
            />

            <div class="row q-mt-md">
              <q-btn type="submit" label="Войти" color="primary" class="full-width" :loading="loading" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const form = reactive({
  login: '',
  password: '',
});

const onSubmit = async () => {
  loading.value = true;
  const success = await authStore.login(form.login, form.password);
  loading.value = false;

  if (success) {
    alert('Вход выполнен');
    router.push('/');
  } else {
    alert('Неверный логин или пароль');
  }
};
</script>