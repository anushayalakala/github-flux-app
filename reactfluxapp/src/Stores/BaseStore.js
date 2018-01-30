import { EventEmitter } from 'events';

class BaseStore extends EventEmitter {

    constructor() {
        super();
    }

    emitChange() {
        this.emit('change');
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
}

export default BaseStore;