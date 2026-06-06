import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  results: {
    brokenLinks: [
      {
        link: String,
        statusCode: Number,
      }
    ],
    consoleErrors: [String],
    accessibilityIssues: [
      {
        type: String,
        description: String,
      }
    ],
    metaTags: {
      title: String,
      description: String,
      ogImage: String,
    },
    performance: {
      loadTime: Number,
    }
  },
  shareableLink: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  }
})

export default mongoose.model('Report', reportSchema)