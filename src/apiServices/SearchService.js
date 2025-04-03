import request from "../utils/request"

export function SearchSuggestion(q) {
    return request.get('Products/searchSuggestions', {
        params: {
            keyword: q,
        }
    }).then((res) => {
        return res.data;
    }).catch(() => {
        console.log("error")
        return null;
    })
}

