import Router from 'express';
import {createrestaurant,getrestaurant,getallrestaurants, deleterestaurant} from '../handlers/retaurant/restaurant';
import {protect} from '../utils/auth';
const restaurantRouter = Router();
restaurantRouter.post('/restaurantreview',protect,createrestaurant);
restaurantRouter.get('/usergetrestaurantreviews',protect,getrestaurant);
restaurantRouter.get('/getallrestaurants',getallrestaurants);
restaurantRouter.delete('/deleterestaurant/:id',protect,deleterestaurant);
export default restaurantRouter;