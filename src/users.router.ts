import express from 'express'
import  {createUser,getUsers,getUserbyId,changeById,deleteById,sortedByAge} from './users.controller'

const router = express.Router()

router.post('/users', createUser)
router.get('/users', getUsers)
router.get('/users/:id', getUserbyId)
router.put('/users/:id', changeById)
router.delete('/users/:id', deleteById)
router.get('/sortedusers/ByAge', sortedByAge)

export default router 