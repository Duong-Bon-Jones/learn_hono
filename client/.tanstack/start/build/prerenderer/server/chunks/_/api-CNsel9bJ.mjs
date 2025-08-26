import { clsx } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/clsx/dist/clsx.mjs';
import { twMerge } from 'file://C:/Users/WBPC.VN/me/hono_fs/client/node_modules/tailwind-merge/dist/bundle-mjs.mjs';
import { hc } from 'file://C:/Users/WBPC.VN/me/hono_fs/node_modules/hono/dist/client/index.js';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const client = hc("/");
const api = client.api;

export { api as a, cn as c };
//# sourceMappingURL=api-CNsel9bJ.mjs.map
