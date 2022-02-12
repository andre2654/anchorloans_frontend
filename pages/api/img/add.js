import backend from '../../../services/backend'

export default async (request, response) => {
    const {
        uploadedBy,
        fileURL,
        adminUser
    } = request.body;

    const newImg = {
        uploadedBy: uploadedBy,
        fileURL: fileURL,
        approvedStatus: adminUser == 'true' ? true : false
    };

    console.log(adminUser)
    console.log(newImg)

    backend.post('/img/add', newImg).then(result => {
        return response.status(result.request.res.statusCode).json(result.data);
    });
};
