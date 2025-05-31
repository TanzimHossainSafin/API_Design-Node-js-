import Router from 'express';
import {createrestaurant,getrestaurant,getallrestaurants} from '../handlers/retaurant/restaurant';
import {protect} from '../utils/auth';
const restaurantRouter = Router();
restaurantRouter.post('/restaurantreview',protect,createrestaurant);
restaurantRouter.get('/usergetrestaurantreviews',protect,getrestaurant);
restaurantRouter.get('/getallrestaurants',getallrestaurants);
export default restaurantRouter;