import express from 'express';
import Assignment from './assignment.model.js';

const router = express.Router();

// Create assignment
router.post('/create', async (req, res) => {
  try {
    const { title, description, comments = [], tags = [] } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .send({ message: 'Title and description are required.' });
    }
    const assignment = await Assignment.create({
      title,
      description,
      comments,
      tags,
    });
    return res
      .status(201)
      .send({ message: 'Assignment created successfully', assignment });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Failed to create assignment', error: error.message });
  }
});

// Get all assignments
router.get('/all', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    return res.status(200).send({ assignments });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Failed to fetch assignments', error: error.message });
  }
});

// Get assignment by id
router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).send({ message: 'Assignment not found' });
    }
    return res.status(200).send({ assignment });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Failed to fetch assignment', error: error.message });
  }
});

// Update assignment by id
router.put('/:id', async (req, res) => {
  try {
    const { title, description, comments, tags } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .send({ message: 'Title and description are required.' });
    }
    const updateFields = { title, description };
    if (comments !== undefined) updateFields.comments = comments;
    if (tags !== undefined) updateFields.tags = tags;
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    if (!updatedAssignment) {
      return res.status(404).send({ message: 'Assignment not found' });
    }
    return res.status(200).send({
      message: 'Assignment updated successfully',
      assignment: updatedAssignment,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Failed to update assignment', error: error.message });
  }
});

// Delete assignment by id
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!deletedAssignment) {
      return res.status(404).send({ message: 'Assignment not found' });
    }
    return res.status(200).send({
      message: 'Assignment deleted successfully',
      assignment: deletedAssignment,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Failed to delete assignment', error: error.message });
  }
});

export default router;
