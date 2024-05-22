### Updated Readme Summary with Request Bodies

#### Routes:

1. **attendanceRoutes.js**
   - **API Call:** `/api/attendances`
   - **Functionalities:**
     - **Retrieve all attendance records:** `GET /api/attendances`
     - **Add a new attendance record:** `POST /api/attendances`
       - **Request Body:**
         ```json
         {
           "student_id": "string",
           "course_id": "string",
           "attendances": [
             {
               "date": "string",
               "status": "string"
             }
           ]
         }
         ```
     - **Update an existing attendance record:** `PUT /api/attendances`
       - **Request Body:**
         ```json
         {
           "student_id": "string",
           "course_id": "string",
           "date": "string",
           "status": "string"
         }
         ```

2. **login.js**
   - **API Call:** `/api/`
   - **Functionalities:**
     - **User login:** `POST /api/`
       - **Request Body:**
         ```json
         {
           "id": "string",
           "password": "string"
         }
         ```

3. **lecturerCourses.js**
   - **API Call:** `/api/lecturer-courses`
   - **Functionalities:**
     - **Retrieve courses for a specific lecturer:** `GET /api/lecturer-courses/:lecturer_id`

4. **courseAttendance.js**
   - **API Call:** `/api/course-attendance`
   - **Functionalities:**
     - **Retrieve attendance records for a specific course and include student details:** `GET /api/course-attendance/:course_id`

5. **studentCourses.js**
   - **API Call:** `/api/student-courses`
   - **Functionalities:**
     - **Retrieve courses for a specific student:** `GET /api/student-courses/:student_id`

6. **lecturerCourseAttendance.js**
   - **API Call:** `/api/lecturer-course-attendance`
   - **Functionalities:**
     - **Retrieve attendance records for a specific course taught by a lecturer:** `GET /api/lecturer-course-attendance/:lecturer_id/:course_id`

7. **notifications.js**
   - **API Call:** `/api/notifications`
   - **Functionalities:**
     - **Create a notification:** `POST /api/notifications`
       - **Request Body (form-data):**
         ```json
         {
           "recipient_id": "string",
           "sender_id": "string",
           "message": "string",
           "date_sent": "string",
           "course_id": "string",
           "file": "file"
         }
         ```
     - **Retrieve notifications by recipient_id:** `GET /api/notifications/:recipient_id`
     - **Serve uploaded files:** `GET /api/notifications/file/:filename`
     - **Delete a notification by notification_id:** `DELETE /api/notifications/delete/:id`

8. **fileUpload.js**
   - **API Call:** `/api/files/upload`
   - **Functionalities:**
     - **Handle file uploads:** `POST /api/files/upload`
       - **Request Body (form-data):**
         ```json
         {
           "file": "file"
         }
         ```

9. **fileDownload.js**
   - **API Call:** `/api/files`
   - **Functionalities:**
     - **Serve file based on the file path in the database:** `GET /api/files/:id`

10. **qrRoutes.js**
    - **API Call:** `/api/qr`
    - **Functionalities:**
      - **Generate a passcode and update it in the database for a specific course:** `POST /api/qr/generate/:course_id`
        - **Request Body:**
          ```json
          {
            "validity_period": "number"
          }
          ```
--------------------------------
