import { Schema, model, models } from 'mongoose';

const QueSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  que: {
    type: String,
    required: [true, 'Question is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

const Que = models.Que || model('Que', QueSchema);

export default Que;