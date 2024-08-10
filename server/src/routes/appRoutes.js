const express = require('express');
const userController = require('../controller/userController')
<<<<<<< HEAD
const specialityController = require('../controller/specialityController')
const schedulesController = require('../controller/schedulesController')
const patientController = require('../controller/patientController')
const appointmentController = require('../controller/appointmentController')
const doctorController = require('../controller/doctorController')

=======
const blogController = require('../controller/blogController')
>>>>>>> 4dc7301 (server added)
const authenticateToken = require('../middleware/authMiddleware')
 

const router = express.Router();




router.post ('/auth/signup', userController.addUser)
<<<<<<< HEAD

=======
router.get('/user/blogs',authenticateToken, blogController.getUserBlogs);
>>>>>>> 4dc7301 (server added)
router.get('/user/:email', userController.getUserByEmail);

//router.get('/user/:id', userController.getUserById)
router.post('/auth/login', userController.loginUser)
router.post('/auth/verify-otp', userController.verifyOTP)

router.post('/auth/logout', userController.logoutUser)
router.post('/auth/token', userController.token)
router.post('/password/verify-otp', userController.verifyPasswordOtp)
router.post('/forgot-password', userController.forgotPassword)
router.post('/reset-password', userController.passwordReset)
router.delete('/delete-user', userController.deleteUserByEmail)



<<<<<<< HEAD
router.post('/speciality', specialityController.addSpecialty)
router.get('/speciality', specialityController.getAllSpecialties)
router.get('/doctors/by-specialty/:specialty', doctorController.getDoctorsBySpecialty);


router.get('/schedule/:doctorId', schedulesController.getSchedule);
router.post('/timeslot', schedulesController.addTimeSlot);
router.put('/timeslot/:scheduleId', schedulesController.updateTimeSlot);
router.put('/timeslot/unavailable/:scheduleId', schedulesController.markUnavailable); // Route for marking unavailable
router.post('/timeslots', schedulesController.createTimeSlots); // Route for creating multiple time slots
router.get('/available-timeslots/:doctorId', schedulesController.getAvailableTimeSlots);

router.get('/patient-records/patient/:patientId', patientController.getPatientRecordsByPatientId);
router.get('/patient-record/:recordId', patientController.getPatientRecordDetails);
router.post('/patient-record', patientController.addPatientRecord);

router.post('/book/:scheduleId', appointmentController.bookAppointment);







=======



router.post('/blog', authenticateToken, blogController.postBlog);
router.get('/user/blogs',authenticateToken, blogController.getUserBlogs);
router.put('/blog/:id', authenticateToken, blogController.updateBlog);
router.delete('/blog/:id', authenticateToken, blogController.deleteBlog);
router.get('/blog/:userId/:id', authenticateToken, blogController.getSingleUserBlog);
router.get('/blogs', blogController.getAllBlogs);

router.post ('/store-blog', authenticateToken, blogController.storeSingleBlog);

router.get ('/store-blog', authenticateToken, blogController.getStoreBlog);

router.get ('/clear-blog', authenticateToken, blogController.clearBlog);
>>>>>>> 4dc7301 (server added)





module.exports = router;
