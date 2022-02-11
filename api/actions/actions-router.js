// Write your "actions" router here!
const express = require("express")
const router = express.Router()
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Actions.get(req.params.id)
        .then(actions => {
            if (!actions) {
                return res.status(404).json({ message: "Can't find project." })
            }
            res.json(actions)
        })
        .catch((e) => {
            res.status(404).json({ message: "Can't find project." })
        })
})

router.post('/', (req, res, next) => {

    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        return res.status(400).json({ message: "Missing required field" })
    }

    Projects.get(req.body.project_id)
    .then(project => {
        if (!project) {
            return res.status(400).json({ message: "Can't find project." })
        }
        Actions.insert(req.body)
        .then(project => {
            res.json(project)
        })
    })
})

router.put('/:id', (req, res, next) => {

    if (!req.body.project_id || !req.body.description || !req.body.notes || req.body.completed === undefined) {
        return res.status(400).json({ message: "Missing name/description" })
    }

        Actions.update(req.params.id, req.body)
        .then(action => {
            if (!action) {
                return res.status(404).json({ message: "Can't find project." })
            }

            res.json(action)
        })
})

router.delete('/:id', (req, res, next) => {
    Actions.remove(req.params.id)
    .then(action => {
        if (!action) {
            return res.status(404).json({ message: "Can't find project." })
        }

        res.status(200).json({message: "Deleted!"})
    })
})

module.exports = router;