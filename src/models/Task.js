import { v4 as uuid } from 'uuid';

export default class Task {
    constructor({
        id,
        identifier,
        name,
        details,
        isStarred,
        isCompleted,
    } = {}) {
        this.id = id ?? null;
        this.identifier = identifier ?? uuid();
        this.name = name ?? null;
        this.details = details ?? null;
        this.isStarred = isStarred ?? false;
        this.isCompleted = isCompleted ?? false;
    }

    refresh() {
        this.id = null;
        this.identifier = uuid();
        this.name = null;
        this.details = null;
        this.isStarred = false;
        this.isCompleted = false;
    }
}
