<template>
    <v-card
        :disabled="loading"
        :loading="loading"
        flat
        class="page d-flex flex-column"
    >
        <v-card-title class="text-center">Tasks</v-card-title>
        <v-divider />
        <div class="page-body flex-grow-1">
            <v-card-text>
                <task-list :tasks="unfinishedTasks" />
            </v-card-text>
            <v-expansion-panels v-if="completedTasks.length">
                <v-expansion-panel :elevation="0">
                    <v-expansion-panel-title>Completed ({{ completedTasks.length }})</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <task-list :tasks="completedTasks" />
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
        <v-divider />
        <v-card-actions class="d-flex justify-space-between">
            <v-btn icon disabled>
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <new-task @task:saved="fetchTasks" />
            <v-btn icon disabled>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { computed, ref } from 'vue';
import NewTask from '@/components/NewTask.vue';
import TaskList from '@/components/TaskList.vue';
import { useTaskManager } from '@/composables/taskManager.js';

export default {
    name: 'Home',
    components: {
        NewTask,
        TaskList,
    },
    setup() {
        const tasks = ref([]);
        const { loading, getTasks } = useTaskManager();

        function fetchTasks() {
            getTasks().then(result => {
                tasks.value = result;
            });
        }

        fetchTasks();

        const unfinishedTasks = computed(() => tasks.value.filter(task => !task.isCompleted));
        const completedTasks = computed(() => tasks.value.filter(task => task.isCompleted));

        return { loading, unfinishedTasks, completedTasks, fetchTasks };
    },
}
</script>

<style scoped>
.page {
    height: 100vh;
    overflow: hidden;
}

.page-body {
    overflow-y: auto;
}
</style>
