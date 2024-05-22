const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const attendanceRoutes = require('./routes/attendanceRoutes'); // Ensure this path is correct
const loginRoute = require('./routes/login'); // Import login route
const lecturerCoursesRoute = require('./routes/lecturerCourses'); // Import lecturer courses route
const courseAttendanceRoute = require('./routes/courseAttendance'); // Import course attendance route
const studentCoursesRoute = require('./routes/studentCourses'); // Import student courses route
const lecturerCourseAttendanceRoute = require('./routes/lecturerCourseAttendance'); // Import lecturer course attendance route
const notificationsRoute = require('./routes/notifications'); // Import notifications route
const fileUploadRoute = require('./routes/fileUpload'); // Import file upload route
const fileDownloadRoute = require('./routes/fileDownload'); // Import file download route
const qrRoutes = require('./routes/qrRoutes'); // Import QR routes
const qrUpdateRoute = require('./routes/qrUpdate'); // Import QR update route



//end of route declaration

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
const dbURI = 'mongodb+srv://PC:1EVwjeQt8CFDuvsh@attendance.aotlhct.mongodb.net/?retryWrites=true&w=majority&appName=Attendance';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected via Atlas'))
  .catch(err => console.log(err));



// Routes to be used and their api line
app.use('/api/attendances', attendanceRoutes); // Ensure the base route is correct
app.use('/api', loginRoute); // Add login route
app.use('/api/lecturer-courses', lecturerCoursesRoute); // Add lecturer courses route
app.use('/api/course-attendance', courseAttendanceRoute); // Add course attendance route
app.use('/api/student-courses', studentCoursesRoute); // Add student courses route
app.use('/api/lecturer-course-attendance', lecturerCourseAttendanceRoute); // Add lecturer course attendance route
app.use('/api/notifications', notificationsRoute); // Add notifications route
app.use('/api/files', fileUploadRoute); // Add file upload route
app.use('/api/files', fileDownloadRoute); // Add file download route
app.use('/api/qr', qrRoutes); // Add QR route to generate new pass and time
app.use('/api/qr', qrUpdateRoute); // Add QR update route





//check app is working when running server.js
app.get('/', (req, res) => {
    res.send('Welcome to the Attendance System');
});

module.exports = app;
