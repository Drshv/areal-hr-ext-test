<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>HR система</q-toolbar-title>
        <q-btn flat label="Выйти" @click="logout" v-if="authStore.isAuthenticated" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above bordered>
      <q-list>
        <q-item clickable v-ripple to="/employees">
          <q-item-section>Сотрудники</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/organizations">
          <q-item-section>Организации</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/departments">
          <q-item-section>Отделы</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/positions">
          <q-item-section>Должности</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/users">
          <q-item-section>Пользователи</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const drawer = ref(true);

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>