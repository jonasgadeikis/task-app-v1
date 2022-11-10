<template>
    <div>
        <div
            v-for="task in tasks"
            :key="task.identifier"
            class="d-flex"
        >
            <div class="d-flex">
                <v-btn
                    icon
                    variant="text"
                    @click="completeTask(task)"
                >
                    <v-icon :color="task.isCompleted ? 'primary' : ''">
                        {{ task.isCompleted ? 'mdi-check' : 'mdi-checkbox-blank-circle-outline' }}
                    </v-icon>
                </v-btn>
                <span
                    class="ml-2 align-self-center"
                    :class="{ 'text-decoration-line-through': task.isCompleted }"
                >
                    {{ task.name }}
                </span>
            </div>
            <v-spacer />
            <v-btn
                v-if="!task.isCompleted"
                icon
                variant="text"
                color="primary"
                @click="starTask(task)"
            >
                <v-icon>{{ task.isStarred ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'TaskList',
    emits: [
        'task:updated',
    ],
    props: {
        tasks: {
            type: Array,
            required: true,
        },
    },
    setup() {
        function completeTask(task) {
            task.isCompleted = !task.isCompleted;

            updateTask(task);
        }

        function starTask(task) {
            task.isStarred = !task.isStarred;

            updateTask(task);
        }

        function updateTask(task) {
            axios.patch(`http://localhost:4000/tasks/${task.id}`, task);
        }

        return { completeTask, starTask };
    },
}
</script>
