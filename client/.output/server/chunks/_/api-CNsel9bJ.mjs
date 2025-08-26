import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { hc } from 'hono/client';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const client = hc("/");
const api = client.api;

export { api as a, cn as c };
//# sourceMappingURL=api-CNsel9bJ.mjs.map
