// Simple plugin manager
const plugins = [];

export default {
  register(plugin) {
    plugins.push(plugin);
  },
  async init() {
    for (const p of plugins) {
      if (p.init) await p.init();
    }
  },
  async runBeforeRequest(ctx) {
    // allow plugins to modify input/messages
    let newCtx = { ...ctx };
    for (const p of plugins) {
      if (p.beforeRequest) {
        try { newCtx = await p.beforeRequest(newCtx) || newCtx; } catch(e) { console.warn(e); }
      }
    }
    return newCtx;
  },
  async runAfterResponse(ctx) {
    for (const p of plugins) {
      if (p.afterResponse) {
        try { await p.afterResponse(ctx); } catch(e) { console.warn(e); }
      }
    }
  }
};
