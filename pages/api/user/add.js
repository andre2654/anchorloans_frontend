import backend from '../../../services/backend'

export default async (request, response) => {
	const {
		name,
		password,
		admin
	} = request.body;

	const newUser = {
		name: name,
		password: password,
		admin: admin
	};

	backend.post('/user/add', newUser).then(result => {
		return response.status(result.request.res.statusCode).json(result.data);
	});
};
