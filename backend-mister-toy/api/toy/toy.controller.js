const toyService = require('./toy.service.js')

async function getToys(req, res) {
  try {
    const filterBy = req.query
    const toys = await toyService.query(filterBy)
    res.json(toys)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get toys' })
  }
}

async function getToyById(req, res) {
  try {
    const { toyId } = req.params
    const toy = await toyService.getById(toyId)
    if(!toy.msgs) toy.msgs = []
    res.json(toy)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get toy' })
  }
}

async function addToy(req, res) {
  try {
    const toy = req.body
    const addToy = await toyService.add(toy)
    res.json(addToy)
  } catch (err) {
    res.status(500).send({ err: 'Failed to add toy' })
  }
}


async function updateToy(req, res) {
  try {
    const updatedToy = await toyService.update(req.body)
    res.json(updatedToy)
  } catch (err) {
    res.status(500).send({ err: 'Failed to update toy' })
  }
}

async function removeToy(req, res) {
  try {
    const { toyId } = req.params
    const removedId = await toyService.remove(toyId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send({ err: 'Failed to remove toy' })
  }
}

async function queryLabels(req, res) {
    try {
        const labels = await toyService.queryLabels()
        res.send(labels)
      } catch (err) {
        res.status(500).send({ err: 'Failed to get labels' })
      }
}

async function addMsg(req, res) {
  try {
    const toyId = req.params.toyId
    const msg = {
      txt: req.params.msg,
      by: req.loggedinUser
    }
    const resultMgs = await toyService.addMsg(toyId, msg)
    res.send(resultMgs)
  } catch (err) {
    res.status(500).send({ err: 'Failed to add mgs' })
  }
}

module.exports = {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
  queryLabels,
  addMsg
}
