import { createStore } from 'redux';

import { rootRducer } from './reducers'

export const store = createStore(rootRducer);