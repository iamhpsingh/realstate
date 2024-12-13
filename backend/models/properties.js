import mongoose from 'mongoose';

const propertiesSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
        },
    size:{type:Number,required:true}
  },
  {
    timestamps: true,
  }
);

export const Properties = mongoose.model('Properties', propertiesSchema);
