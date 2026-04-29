import User from "../models/User.js";

export const createUser = (req, res) => {
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({ error: "Invalid input" });
    }

    User.findOne().sort({ id: -1 })   // get last inserted user
        .then(lastUser => {
            const newId = lastUser ? lastUser.id + 1 : 1;

            return User.create({ id: newId, name, role });
        })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: err.message }));
};

export const getUsers = (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err.message }));
};


export const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);

    User.findOne({ id: userId })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
};


export const updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({ error: "Invalid input" });
    }

    User.findOneAndUpdate(
        { id: userId },          
        { name, role },
        { new: true }              
    )
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
};


export const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);

    User.findOneAndDelete({ id: userId })   
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json({ message: "User deleted" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};