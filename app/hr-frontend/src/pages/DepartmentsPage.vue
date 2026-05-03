<template>
  <div class="q-pa-md">
    <div class="row q-mb-md">
      <div class="col-12">
        <h5 class="q-my-none">Отделы</h5>
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-12">
        <q-btn label="Добавить отдел" color="primary" @click="createItem" />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-12 col-md-4">
        <q-input
          v-model="filters.name"
          label="Фильтр по названию"
          clearable
          dense
          @keyup.enter="loadItems"
          @clear="loadItems"
        >
          <template v-slot:append>
            <q-icon name="search" @click="loadItems" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
    </div>

    <q-table
      :rows="items"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :pagination="pagination"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round dense icon="edit" color="primary" @click="editItem(props.row)" />
          <q-btn flat round dense icon="delete" color="negative" @click="confirmDelete(props.row)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="editDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ editForm.id ? 'Редактирование' : 'Новый отдел' }}</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveItem">
            <q-select
              v-model="editForm.organization_id"
              :options="organizations"
              label="Организация"
              option-value="id"
              option-label="name"
              emit-value
              map-options
              lazy-rules
              :rules="[val => !!val || 'Обязательное поле']"
            />
            <q-input v-model="editForm.name" label="Название" lazy-rules :rules="[val => !!val || 'Обязательное поле']" />
            <q-input v-model="editForm.comment" label="Комментарий" />
            <q-input v-model="editForm.parent_id" label="ID родительского отдела (опционально)" />

            <div class="row q-mt-md">
              <q-btn type="submit" label="Сохранить" color="primary" class="q-mr-md" />
              <q-btn label="Отмена" flat @click="editDialog = false" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Удаление</div>
        </q-card-section>
        <q-card-section>
          Вы уверены, что хотите удалить {{ deleteItem?.name }}?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Удалить" color="negative" @click="deleteItemConfirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();

const items = ref([]);
const organizations = ref([]);
const loading = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const deleteItem = ref(null);

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

const filters = reactive({
  name: '',
});

const columns = [
  { name: 'name', label: 'Название', field: 'name', sortable: true },
  { name: 'comment', label: 'Комментарий', field: 'comment' },
  { name: 'actions', label: 'Действия', field: 'actions', align: 'center' },
];

const editForm = reactive({
  id: null,
  organization_id: null,
  name: '',
  comment: '',
  parent_id: null,
});

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${authStore.token}`,
});

const loadOrganizations = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/organizations', { headers: getHeaders() });
    const data = await response.json();
    organizations.value = data.data;
  } catch (error) {
    console.error('Load organizations error:', error);
  }
};

const loadItems = async () => {
  loading.value = true;
  try {
    let url = `http://localhost:3000/api/departments?page=${pagination.value.page}&limit=${pagination.value.rowsPerPage}`;
    if (filters.name) url += `&name=${encodeURIComponent(filters.name)}`;

    const response = await fetch(url, { headers: getHeaders() });
    const data = await response.json();

    items.value = data.data;
    pagination.value.rowsNumber = data.total;
  } catch (error) {
    console.error('Load error:', error);
    alert('Ошибка загрузки');
  } finally {
    loading.value = false;
  }
};

const onRequest = (props) => {
  pagination.value.page = props.pagination.page;
  pagination.value.rowsPerPage = props.pagination.rowsPerPage;
  loadItems();
};

const createItem = () => {
  editForm.id = null;
  editForm.organization_id = null;
  editForm.name = '';
  editForm.comment = '';
  editForm.parent_id = null;
  editDialog.value = true;
};

const editItem = (item) => {
  Object.assign(editForm, item);
  editDialog.value = true;
};

const saveItem = async () => {
  try {
    const { id, ...payload } = editForm;
    const url = id
      ? `http://localhost:3000/api/departments/${id}`
      : 'http://localhost:3000/api/departments';
    const method = id ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert(id ? 'Сохранено' : 'Создано');
      editDialog.value = false;
      await loadItems();
    } else {
      alert('Ошибка сохранения');
    }
  } catch (error) {
    console.error('Save error:', error);
    alert('Ошибка сохранения');
  }
};

const confirmDelete = (item) => {
  deleteItem.value = item;
  deleteDialog.value = true;
};

const deleteItemConfirm = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/departments/${deleteItem.value.id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (response.ok) {
      alert('Удалено');
      deleteDialog.value = false;
      await loadItems();
    } else {
      alert('Ошибка удаления');
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Ошибка удаления');
  }
};

onMounted(() => {
  loadOrganizations();
  loadItems();
});
</script>