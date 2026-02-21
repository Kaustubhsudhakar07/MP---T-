const User = require('../models/User');
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }) // Exclude password field
        if(!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        if(!contacts || contacts.length === 0) {
            return res.status(404).json({ message: 'No contacts found' });
        }
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    getAllUsers,
    getAllContacts
};