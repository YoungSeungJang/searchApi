import { Axios } from './core';

const PATH = `/search`;

const Api = {
	SearchApi(content) {
		return Axios.get(PATH, {
			params: {
				key: content,
			},
		});
	},
};

export default Api;
