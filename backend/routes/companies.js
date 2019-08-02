/** Routes for companies. */

const express = require("express");
const router = new express.Router();

const {adminRequired, authRequired} = require("../middleware/auth");

const Company = require("../models/company");
const {validate} = require("jsonschema");

const {companyNewSchema, companyUpdateSchema} = require("../schemas");


/** GET /  =>  {companies: [company, company]}  */

router.get("/", authRequired, async function (req, res, next) {
  try {
    const companies = await Company.findAll(req.query);
    return res.json({companies});
  }

  catch (err) {
    return next(err);
  }
});


/** GET /[handle]  =>  {company: company} */

router.get("/:handle", authRequired, async function (req, res, next) {
  try {
    const company = await Company.findOne(req.params.handle);
    return res.json({company});
  }

  catch (err) {
    return next(err);
  }
});

/** POST / {companyData} =>  {company: newCompany} */

router.post("/", adminRequired, async function (req, res, next) {
  try {
    const validation = validate(req.body, companyNewSchema);

    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map(e => e.stack)
      });
    }

    const company = await Company.create(req.body);
    return res.status(201).json({company});   // 201 CREATED
  }

  catch (err) {
    return next(err);
  }
});


/** PATCH /[handle] {companyData} => {company: updatedCompany}  */

router.patch("/:handle", adminRequired, async function (req, res, next) {
  try {
    if ("handle" in req.body) {
      return next({status: 400, message: "Not allowed"});
    }

    const validation = validate(req.body, companyUpdateSchema);
    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map(e => e.stack)
      });
    }

    const company = await Company.update(req.params.handle, req.body);
    return res.json({company});
  }

  catch (err) {
    return next(err);
  }
});


/** DELETE /[handle]  =>  {message: "Company deleted"}  */

router.delete("/:handle", adminRequired, async function (req, res, next) {
  try {
    await Company.remove(req.params.handle);
    return res.json({message: "Company deleted"});
  }

  catch (err) {
    return next(err);
  }
});


module.exports = router;
