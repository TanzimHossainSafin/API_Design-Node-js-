import Router from 'express';
import {createreview,getreview} from '../handlers/review/review';
import {protect} from '../utils/auth';
const reviewRouter = Router();
reviewRouter.post('/customer',protect,createreview);
reviewRouter.get('/getreview',protect,getreview);
export default reviewRouter;