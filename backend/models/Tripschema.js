import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Signup',
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Greenest Route', 'Fastest Route', 'Cheapest Route'],
    default: 'Greenest Route'
  },
  estimatedTime: String,
  estimatedCost: String,
  co2Saved: String
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
