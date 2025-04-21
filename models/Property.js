import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required']
    }
  },
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['house', 'apartment', 'condo', 'land', 'commercial']
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['for-sale', 'for-rent', 'sold', 'rented'],
    default: 'for-sale'
  },
  features: {
    bedrooms: {
      type: Number,
      min: [0, 'Bedrooms cannot be negative']
    },
    bathrooms: {
      type: Number,
      min: [0, 'Bathrooms cannot be negative']
    },
    area: {
      type: Number,
      min: [0, 'Area cannot be negative']
    },
    parking: {
      type: Number,
      min: [0, 'Parking spaces cannot be negative']
    }
  },
  images: [{
    url: String,
    public_id: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner information is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export default Property; 