import backend from '../../../services/backend'

export default async (request, response) => {
    const { id } = request.body;

    backend.post('/img/approve', { id: id }).then(result => {
        return response.status(result.request.res.statusCode).json(result.data);
    });
};
