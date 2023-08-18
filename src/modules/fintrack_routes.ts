import { Router } from 'express';

import { fintrackGetbyid } from './fintrack_controllers';

import { fintrackPost } from './fintrack_controllers';

import { fintrackPutbyid } from './fintrack_controllers';

import { fintrackDeletebyid } from './fintrack_controllers';

const router = Router();

router.get('/user/:id', fintrackGetbyid);

router.post('/transaction', fintrackPost);

router.put('/transaction/:id', fintrackPutbyid);

router.delete('/transaction/:id', fintrackDeletebyid);


export default router;