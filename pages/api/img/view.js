import backend from '../../../services/backend'

export default async (request, response) => {
    backend.get('/img/view').then(result => {
        return response.status(result.request.res.statusCode).json(result.data);
    });
};
