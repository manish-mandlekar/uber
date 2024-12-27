const express = require('express')
const router = express.Router();
const {body} = require('express-validator')
const captainController = require('../controllers/captain.controller');
const { authCaptain } = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name must be at least 3 characters long '),
    body('password').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity must  be at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type')
    
],
captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:5}).withMessage('Password must be at least 5 character long')
],
captainController.loginCaptain
)
router.get('/profile',authCaptain,captainController.getCaptainProfile)
router.get('/logout',authCaptain,captainController.logoutCaptain)


module.exports = router;