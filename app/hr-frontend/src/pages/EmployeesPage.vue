<template>
  <div class="q-pa-md">
    <div class="row q-mb-md">
      <div class="col-12">
        <h5 class="q-my-none">Сотрудники</h5>
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-12">
        <q-btn label="Добавить сотрудника" color="primary" @click="createEmployee" />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-12 col-md-4">
        <q-input
          v-model="filters.last_name"
          label="Фильтр по фамилии"
          clearable
          dense
          @keyup.enter="loadEmployees"
          @clear="loadEmployees"
        >
          <template v-slot:append>
            <q-icon name="search" @click="loadEmployees" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
    </div>

    <q-table
      :rows="employees"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :pagination="pagination"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round dense icon="edit" color="primary" @click="editEmployee(props.row)" />
          <q-btn flat round dense icon="delete" color="negative" @click="confirmDelete(props.row)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="editDialog">
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">{{ editForm.id ? 'Редактирование' : 'Новый сотрудник' }}</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveEmployee">
            <q-input v-model="editForm.last_name" label="Фамилия" lazy-rules :rules="[val => !!val || 'Обязательное поле']" />
            <q-input v-model="editForm.first_name" label="Имя" lazy-rules :rules="[val => !!val || 'Обязательное поле']" />
            <q-input v-model="editForm.middle_name" label="Отчество" />
            <q-input v-model="editForm.birth_date" label="Дата рождения" type="date" />
            <q-input v-model="editForm.passport_series" label="Серия паспорта" />
            <q-input v-model="editForm.passport_number" label="Номер паспорта" />
            <q-input v-model="editForm.passport_issue_date" label="Дата выдачи" type="date" />
            <q-input v-model="editForm.passport_division_code" label="Код подразделения" />
            <q-input v-model="editForm.passport_issued_by" label="Кем выдан" />
            <q-input v-model="editForm.registration_region" label="Область" />
            <q-input v-model="editForm.registration_locality" label="Населенный пункт" />
            <q-input v-model="editForm.registration_street" label="Улица" />
            <q-input v-model="editForm.registration_house" label="Дом" />
            <q-input v-model="editForm.registration_building" label="Корпус" />
            <q-input v-model="editForm.registration_apartment" label="Квартира" />

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
          <div class="text-h6">Удаление сотрудника</div>
        </q-card-section>
        <q-card-section>
          Вы уверены, что хотите удалить сотрудника {{ deleteItem?.last_name }} {{ deleteItem?.first_name }}?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Удалить" color="negative" @click="deleteEmployee" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();

const employees = ref([]);
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
  last_name: '',
});

const columns = [
  { name: 'last_name', label: 'Фамилия', field: 'last_name', sortable: true },
  { name: 'first_name', label: 'Имя', field: 'first_name', sortable: true },
  { name: 'middle_name', label: 'Отчество', field: 'middle_name' },
  { name: 'birth_date', label: 'Дата рождения', field: 'birth_date' },
  { name: 'passport_series', label: 'Серия', field: 'passport_series' },
  { name: 'passport_number', label: 'Номер', field: 'passport_number' },
  { name: 'actions', label: 'Действия', field: 'actions', align: 'center' },
];

const editForm = reactive({
  id: null,
  last_name: '',
  first_name: '',
  middle_name: '',
  birth_date: '',
  passport_series: '',
  passport_number: '',
  passport_issue_date: '',
  passport_division_code: '',
  passport_issued_by: '',
  registration_region: '',
  registration_locality: '',
  registration_street: '',
  registration_house: '',
  registration_building: '',
  registration_apartment: '',
});

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${authStore.token}`,
});

const convertDate = (dateStr) => {
  if (!dateStr) return null;
  if (dateStr.includes('-')) return dateStr;
  const parts = dateStr.split('.');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
};

const loadEmployees = async () => {
  loading.value = true;
  try {
    let url = `http://localhost:3000/api/employees?page=${pagination.value.page}&limit=${pagination.value.rowsPerPage}`;
    if (filters.last_name) url += `&last_name=${encodeURIComponent(filters.last_name)}`;

    const response = await fetch(url, { headers: getHeaders() });
    const data = await response.json();

    employees.value = data.data;
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
  loadEmployees();
};

const createEmployee = () => {
  editForm.id = null;
  editForm.last_name = '';
  editForm.first_name = '';
  editForm.middle_name = '';
  editForm.birth_date = '';
  editForm.passport_series = '';
  editForm.passport_number = '';
  editForm.passport_issue_date = '';
  editForm.passport_division_code = '';
  editForm.passport_issued_by = '';
  editForm.registration_region = '';
  editForm.registration_locality = '';
  editForm.registration_street = '';
  editForm.registration_house = '';
  editForm.registration_building = '';
  editForm.registration_apartment = '';
  editDialog.value = true;
};

const editEmployee = (employee) => {
  Object.assign(editForm, employee);
  editForm.birth_date = employee.birth_date ? employee.birth_date.split('T')[0] : '';
  editForm.passport_issue_date = employee.passport_issue_date ? employee.passport_issue_date.split('T')[0] : '';
  editDialog.value = true;
};

const saveEmployee = async () => {
  try {
    const { id, ...payload } = editForm;

    payload.birth_date = convertDate(payload.birth_date);
    payload.passport_issue_date = convertDate(payload.passport_issue_date);

    const url = id
      ? `http://localhost:3000/api/employees/${id}`
      : 'http://localhost:3000/api/employees';
    const method = id ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert(id ? 'Сохранено' : 'Создано');
      editDialog.value = false;
      await loadEmployees();
    } else {
      alert('Ошибка сохранения');
    }
  } catch (error) {
    console.error('Save error:', error);
    alert('Ошибка сохранения');
  }
};

const confirmDelete = (employee) => {
  deleteItem.value = employee;
  deleteDialog.value = true;
};

const deleteEmployee = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/employees/${deleteItem.value.id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (response.ok) {
      alert('Удалено');
      deleteDialog.value = false;
      await loadEmployees();
    } else {
      alert('Ошибка удаления');
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Ошибка удаления');
  }
};

onMounted(() => {
  loadEmployees();
});
</script>