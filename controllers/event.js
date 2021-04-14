const mongoose = require("mongoose");
const Store = mongoose.model("Store");

module.exports = {
  getAllEvents: async function (req, res) {
    Store.find().then(function (allEvents) {
      res.json({
        status: "success",
        data: {
          store: allEvents,
        },
      });
    });
  },

  getSingleEvent: async function (req, res) {
    if (req.params.id) {
      Store.find({ _id: req.params.id }).then(function (results) {
        if (results && results.length > 0) {
          res.json({
            status: "success",
            data: {
              store: results[0],
            },
          });
        } else {
          res.json({
            status: "fail",
            data: { id: "The specified id was not found" },
          });
        }
      });
    } else {
      res.json({
        status: "fail",
        data: { id: "An id is required but was not passed in." },
      });
    }
  },

  addEvent: async function (req, res) {
    if (
      req.body &&
      req.body.name &&
      req.body.address &&
      req.body.zip
    ) {
      try {
        await Store.create(req.body);
        res.status(201);
        res.json({
          status: "success",
          data: {},
        });
      } catch (err) {
        res.json({
          status: "error",
          data: err.message,
        });
      }
    } else {
      res.json({
        status: "fail",
        data: "All fields were not provided. Can not create this store.",
      });
    }
  },

  editEvent: async function (req, res) {
    if (req.params.id && req.body) {
      try {
        await Store.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(201);
        res.json({
          status: "success",
          data: {},
        });
      } catch (err) {
        res.json({
          status: "error",
          data: err.message,
        });
      }
    } else {
      res.json({
        status: "fail",
        data: "All fields were not provided. Can not update this store.",
      });
    }
  },

  deleteById: async function (req, res) {
    if (req.params.id) {
      await Store.findByIdAndDelete({_id: req.params.id});

      res.json({
        status: "success",
        data: {},
      });
    } else {
      res.json({
        status: "fail",
        data: { id: "An id is required but was not passed in." },
      });
    }

  }
};
