import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  // Add other fields as needed
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;
