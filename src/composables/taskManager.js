import { reactive, ref } from 'vue';
import Task from '@/models/Task.js';
import axios from 'axios';

export const useTaskManager = () => {
    const task = reactive(new Task());
    const loading = ref(false);

    const saveTask = () => new Promise(resolve => {
        loading.value = true;

        setTimeout(() => {
            axios.post('http://localhost:4000/tasks', task).then(() => {
                task.refresh();

                resolve();
            }).finally(() => {
                loading.value = false;
            });
        }, 500);
    });

    const getTasks = () => new Promise(resolve => {
        loading.value = true;

        setTimeout(() => {
            axios.get('http://localhost:4000/tasks').then(({ data }) => {
                resolve(data);
            }).finally(() => {
                loading.value = false;
            });
        }, 500);
    });

    return { task, loading, saveTask, getTasks };
}
