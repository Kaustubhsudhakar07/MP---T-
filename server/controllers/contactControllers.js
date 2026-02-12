const Contact = require('../models/contactModel');
const contactForm = async (req, res) => {
try {
const response = req.body;
await Contact.create(response);
return res.status(200).json({ message: 'Contact form submitted successfully' });

} 
catch (error) {
console.error('Error submitting contact form:', error);
res.status(500).json({ message: 'Failed to submit contact form' });
}
};

module.exports = contactForm;