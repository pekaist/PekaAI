// Example plugin that saves last query to local memory
import memory from '../memory/store';

export default {
  id: 'example',
  init: async () => {
    // plugin init
  },
  beforeRequest: async (ctx) => {
    // for example modify input
    return ctx;
  },
  afterResponse: async (ctx) => {
    try {
      await memory.save({ time: Date.now(), input: ctx.input, response: ctx.response.text });
    } catch(e) { console.warn(e); }
  }
};
