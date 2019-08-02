/** Routes for jobs. */

const express = require("express");
const router = express.Router({ mergeParams: true });

const { adminRequired, authRequired } = require("../middleware/auth");

const Job = require("../models/job");
const { validate } = require("jsonschema");

const { jobNewSchema, jobUpdateSchema } = require("../schemas");


/** GET / => {jobs: [job, ...]} */

router.get("/", authRequired, async function(req, res, next) {
  try {
    const jobs = await Job.findAll(req.query, req.username);
    return res.json({jobs});
  }

  catch (err) {
    return next(err);
  }
});

/** GET /[jobid] => {job: job} */

router.get("/:id", authRequired, async function(req, res, next) {
  try {
    const job = await Job.findOne(req.params.id);
    return res.json({job});
  }

  catch (err) {
    return next(err);
  }
});

/** POST / {jobData} => {job: job} */

router.post(
    "/", adminRequired, async function(req, res, next) {
      try {
        const validation = validate(req.body, jobNewSchema);

        if (!validation.valid) {
          return next({
            status: 400,
            message: validation.errors.map(e => e.stack)
          });
        }

        const job = await Job.create(req.body);
        return res.status(201).json({job});
      }

      catch (err) {
        return next(err);
      }
    }
);

/** PATCH /[jobid]  {jobData} => {job: updatedJob} */

router.patch("/:id", adminRequired, async function(req, res, next) {
  try {
    if ("id" in req.body) {
      return res.status(400).json({ message: "Not allowed" });
    }

    const validation = validate(req.body, jobUpdateSchema);
    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map(e => e.stack)
      });
    }

    const job= await Job.update(req.params.id, req.body);
    return res.json({job});
  }

  catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  {message: "User deleted"}  */

router.delete("/:id", adminRequired, async function(req, res, next) {
  try {
    await Job.remove(req.params.id);
    return res.json({ message: "Job deleted" });
  }

  catch (err) {
    return next(err);
  }
});


/** POST /[id]/apply  {state} => {message: state} */

router.post("/:id/apply", authRequired, async function(req, res, next) {
  try {
    const state = req.body.state || "applied";
    await Job.apply(req.params.id, req.username, state);
    return res.json({ message: state });
  }

  catch (err) {
    return next(err);
  }
});



module.exports = router;
