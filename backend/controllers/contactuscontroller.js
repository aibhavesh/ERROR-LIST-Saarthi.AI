import Contact from '../models/contactusmodel.js ';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({ message: 'Message sent successfully!', contact });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message', details: err.message });
  }
};
