const api = "http://localhost:3000/api/";

const headers = {
	Accept: "application/json"
};

export const search = query =>
	fetch(`${api}v1/search.json?query=${query}`, { headers })
		.then(res => res.json())
		.then(data => data);
