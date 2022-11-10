import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TaskView from '@/views/TaskView.vue';

const routes = [
    {
        path: '/',
        name: 'tasks-list',
        component: HomeView,
    },
    {
        path: '/task/:id',
        name: 'task-profile',
        component: TaskView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
