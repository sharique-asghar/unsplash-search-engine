const DEFAULT_HEADER = {
    "Content-Type": "application/json",
    "Authorization": "Client-ID tMuDDwugQ5KrdalaOdqvMbpbBda5VGAMSNYgtX4bbyE"
};
const BASE_URL = "https://api.unsplash.com";

const queryParams = (params) => {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

export const getAllPhotos = async (query) => {
    let url = `${BASE_URL}/photos`;
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);

    const r = await fetch(url, {
        data: query,
        headers: DEFAULT_HEADER
    });
    return await r.json();
};

export const searchAllPhotos = async (query) => {
    let url = `${BASE_URL}/search/photos`;
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);

    const r = await fetch(url, {
        data: query,
        headers: DEFAULT_HEADER
    });
    return await r.json();
};