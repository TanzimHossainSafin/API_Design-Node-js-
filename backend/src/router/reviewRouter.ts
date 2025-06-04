import Router from 'express';
import {createreview,deleteReview,getreview, updatereview} from '../handlers/review/review';
import {protect} from '../utils/auth';
const reviewRouter = Router();
reviewRouter.post('/customer',protect,createreview);
reviewRouter.get('/getreview',protect,getreview);
reviewRouter.delete('/deletereview/:id',protect,deleteReview);
reviewRouter.put('/updatereview/:id',protect,updatereview);

export default reviewRouter;