const UsersService = require('../services/users.service');
const service = new UsersService();

const createUser = async ( req, res ) => {
    try { 
        const response = await service.create(req.body);
        res.json({ success: true, data: response});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getUsers = async ( req, res ) => {
    try {
        const response = await service.find();
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const getUserProfile = async ( req, res ) => {
    try {
        const {email} = req.user;
        const response = await service.findOne(email);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id,body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _deleteUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const response = await service.delete(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    createUser, getUsers, getUserProfile, updateUser, _deleteUser
};
