const express = require("express")
const router = express.Router()
const { validateProject } = require('./projects-middleware')
// Write your "projects" router here!
const Projects = require('./projects-model')

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Projects.get(req.params.id)
        .then(projects => {
            if (!projects) {
                return res.status(404).json({ message: "Can't find project." })
            }
            res.json(projects)
        })
        .catch((e) => {
            res.status(404).json({ message: "Can't find project." })
        })
})

router.post('/', (req, res, next) => {

    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: "Missing name/description" })
    }

    Projects.insert(req.body)
        .then(project => {
            res.json(project)
        })
})

router.put('/:id', validateProject, (req, res, next) => {

    Projects.update(req.params.id, req.body)
        .then(projects => {
            if (!projects) {
                return res.status(404).json({ message: "Can't find project." })
            }

            res.json(projects)
        })
})



router.delete('/:id', (req, res, next) => {
    Projects.remove(req.params.id)
    .then(projects => {
        if (!projects) {
            return res.status(404).json({ message: "Can't find project." })
        }

        res.status(200).json({message: "Deleted!"})
    })
})

router.get('/:id/actions', (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(project => {
        res.json(project)
    })
    .catch(next)
})

module.exports = router