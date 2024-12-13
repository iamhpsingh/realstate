import express from 'express';
import { Properties } from '../models/properties.js';

const router = express.Router();

router.post('/properties', async (req, res) => {
  try {
    const { type, description, name, size } = req.body;
    const newProperty = new Properties({ type, description, name, size });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error });
  }
});

router.get('/properties', async (req, res) => {
  try {
    const properties = await Properties.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
});

router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error });
  }
});

router.put('/properties/:id', async (req, res) => {
  try {
    const { type, description, name, size } = req.body;
    const updatedProperty = await Properties.findByIdAndUpdate(
      req.params.id,
      { type, description, name, size },
      { new: true, runValidators: true }
    );
    if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error });
  }
});

router.delete('/properties/:id', async (req, res) => {
  try {
    const deletedProperty = await Properties.findByIdAndDelete(req.params.id);
    if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error });
  }
});

export default router;
