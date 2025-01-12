const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Course.find({}).sort({
        [req.query.column || "name"]: req.query.type === "desc" ? -1 : 1,
      }),
      Course.countDocumentsDeleted()
    ])
      .then(([courses, deletedCount]) => {
        console.log({ courses, deletedCount });
        res.render("me/stored-courses", {
          deletedCount,
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .sort({
        [req.query.column || "name"]: req.query.type === "desc" ? -1 : 1,
      })
      .then((courses) => {
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
  
}

module.exports = new MeController();
