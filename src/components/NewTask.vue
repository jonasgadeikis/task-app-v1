<template>
    <v-dialog
        v-model="dialogState"
        transition="dialog-bottom-transition"
    >
        <template #activator>
            <v-btn
                icon
                color="primary"
                elevation="2"
                @click="dialogState = true"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-text>
                <v-text-field
                    autofocus
                    variant="solo"
                    v-model="task.name"
                    placeholder="New task"
                    hide-details
                />
            </v-card-text>
            <v-card-actions>
                <v-btn
                    icon
                    variant="text"
                    color="primary"
                    @click="task.isStarred = !task.isStarred"
                >
                    <v-icon>{{ task.isStarred ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn
                    variant="text"
                    color="primary"
                    class="text-none"
                    :loading="loading"
                    :disabled="loading"
                    @click="save"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { ref } from 'vue';
import { useTaskManager } from '@/composables/taskManager.js';

export default {
    name: 'NewTask',
    emits: [
        'task:saved',
    ],
    setup(props, { emit }) {
        const dialogState = ref(false);
        const { task, loading, saveTask } = useTaskManager();

        function save() {
            saveTask().then(() => {
                emit('task:saved');

                dialogState.value = false;
            });
        }

        return { dialogState, task, loading, save };
    },
}
</script>
