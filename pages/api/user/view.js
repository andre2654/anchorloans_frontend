import backend from '../../../services/backend'

export default async (request, response) => {
    const {
        name,
        password
    } = request.query;

    const user = {
        name: name,
        password: password
    };

    backend.get('/user/view', { params: user }).then(result => {
        return response.status(result.request.res.statusCode).json(result.data);
    });
};
