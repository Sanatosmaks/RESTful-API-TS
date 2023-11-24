import { type } from "os";
import { UserModel, IUser } from "./users.module";
import {Request, Response} from 'express'
import { error } from "console";

export const createUser = async (req: Request, res: Response) => {   
    try {
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error: any) {
        if (error.code == 11000) return res.status(400).json({error: 'email already exist'})
        res.status(400).json({ error: error.message });
    }  
}

export const getUsers = async (req: Request, res: Response )  => {
    try {
        if (req.query.sort !== 'asc' && req.query.sort !== 'desc') req.query.sort = 'asc'
        const sort = req.query.sort == 'asc' ? 1 : -1  // req.query.sort ? {age: Number(req.query.sort)}:{}
        const users = await UserModel.find().sort({age:sort});   // .sort(sort)
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserbyId = async (req: Request, res: Response ) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ error: 'ser not foUund' });
        }
        res.json(user);
      } catch (error:any) {
    
        res.status(500).json({ error: error.message });
      }
};

export const changeById = async (req: Request, res: Response ) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      } catch (error:any) {
        res.status(500).json({ error: error.message });
      }
};

export const deleteById = async (req: Request, res: Response ) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
      } catch (error:any) {
        res.status(500).json({ error: error.message });
      }
};

const sortedByAgeGt = async (req: Request, res: Response ) => {
    try {
        const gt = req.query.gt
        if (!gt) throw Error ('Specify parameters')
        const users = await UserModel.find({age:{$gt:gt}})
        if (!users) {
          return res.status(200).json([]);
        }
        res.json(users)
      } catch (error:any) {
        res.status(500).json({ error: error.message });
      }
};

export const sortedByAgeLt = async (req: Request, res: Response ) => {
    try { 
        const lt = req.query.lt
        if (!lt) throw Error ('Specify parameters')
        const users = await UserModel.find({age:{$lt:lt}})
        if (!users) {
            return res.status(200).json([]);
        }
        res.json(users)
        } catch (error:any) {
        res.status(500).json({ error: error.message });
        }
};

export const sortedByAge = async (req: Request, res: Response ) => {
    if (req.query.gt) return await sortedByAgeGt(req, res)
    if (req.query.lt) return await sortedByAgeLt(req, res)
}
