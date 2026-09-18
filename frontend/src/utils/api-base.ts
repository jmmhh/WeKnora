export function getApiBaseUrl(): string {
  // LocalHub plugin patch (2026-04-29): respect vite's BASE_URL so that
  // axios calls work at `/app/weknora/` (LocalHub reverse proxy). Without
  // this · axios hits `/api/v1/...` at LocalHub root · gets 404 "Cannot
  // POST". Strip trailing slash so axios doesn't produce `/app/weknora//api/v1/...`.
  // See: plugins/weknora/patches/api-base-baseurl.patch
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  return base;
}

/**
 * Deployment base path with a guaranteed trailing slash (e.g. `/weknora/`).
 * Derived from Vite's BASE_URL so sub-path deployments work consistently.
 */
export function getBasePath(): string {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base : `${base}/`;
}

/**
 * Resolve an app-absolute path against the deployment base path.
 * `withBase('/login')` -> `/weknora/login` (or `/login` at root).
 * Use this instead of hardcoding leading-slash URLs that full-page
 * navigation / native fetch would otherwise send to the origin root.
 */
export function withBase(path: string): string {
  return `${getBasePath()}${String(path).replace(/^\/+/, '')}`;
}
