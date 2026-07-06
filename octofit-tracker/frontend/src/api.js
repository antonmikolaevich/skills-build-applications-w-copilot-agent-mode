const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const isCodespaceApiEnabled = Boolean(codespaceName);

export const buildApiUrl = (endpoint) => {
  const sanitizedEndpoint = endpoint.replace(/^\/+/, '');
  return `${API_BASE_URL.replace(/\/+$/, '')}/api/${sanitizedEndpoint}`;
};

const normalizeApiResponse = (payload) => {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};

export const fetchCollection = async (endpoint) => {
  const response = await fetch(buildApiUrl(endpoint));

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request failed (${response.status} ${response.statusText}): ${text}`);
  }

  const payload = await response.json();
  return normalizeApiResponse(payload);
};


