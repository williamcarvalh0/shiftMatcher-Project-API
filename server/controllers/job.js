const Job = require('../models/Job')
const fs = require('fs')

exports.create = async (req, res) => {
  console.log('req.body: ', req.body)
  console.log('req.file: ', req.file)
  console.log('req.user: ', req.user)

  const { filename } = req.file
  const { jobName, jobDesc, jobPrice, jobCategory, jobQty } = req.body

  try {
    let job = new Job()
    job.fileName = filename
    job.jobName = jobName
    job.jobDesc = jobDesc
    job.jobPrice = jobPrice
    job.jobCategory = jobCategory
    job.jobQty = jobQty

    await job.save()

    res.json({
      successMessage: `${jobName} was created`,
      job,
    })
  } catch (err) {
    console.log(err, 'jobController.create error')
    res.status(500).json({
      errorMessage: 'Please try again later',
    })
  }
}

exports.read = async (req, res) => {
  try {
    const jobId = req.params.jobId
    const job = await Job.findById(jobId)

    res.json(job)
  } catch (err) {
    console.log(err, 'jobController.read error')
    res.status(500).json({
      errorMessage: 'Please try again later',
    })
  }
}

exports.readAll = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate('jobCategory', 'category')

    res.json({ jobs })
  } catch (err) {
    console.log(err, 'jobController.readAll error')
    res.status(500).json({
      errorMessage: 'Please try again later',
    })
  }
}

exports.update = async (req, res) => {
  const jobId = req.params.jobId

  req.body.fileName = req.file.filename

  const oldJob = await Job.findByIdAndUpdate(jobId, req.body)

  fs.unlink(`server/images/${oldJob.fileName}`, (err) => {
    if (err) throw err
    console.log('Image successfully deleted from the filesystem')
  })

  res.json({
    successMessage: 'Job successfully updated',
  })
}

exports.delete = async (req, res) => {
  try {
    const jobId = req.params.jobId
    const deletedJob = await Job.findByIdAndDelete(jobId)

    fs.unlink(`server/images/${deletedJob.fileName}`, (err) => {
      if (err) throw err
      console.log(
        'Image successfully deleted from filesystem',
        deletedJob.fileName
      )
    })

    res.json(deletedJob)
  } catch (err) {
    console.log(err, 'jobController.delete error')
    res.status(500).json({
      errorMessage: 'Please try again later',
    })
  }
}
