var express = require("express");
var router = express.Router();

// Register a user for an event
router.post("/api/register", function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var eventName = req.body.eventName;
    var date = req.body.date;

    if (!name || !email || !eventName || !date) {
        return res.status(400).json({ error: "All fields are required" });
    }

    var ticketNumber = Date.now().toString();
    var newRegistration = { ticketNumber: ticketNumber, name: name, email: email, eventName: eventName, date: date };

    db.model.registrations.push(newRegistration);
    db.update();

    res.status(201).json({ message: "Registration successful", ticketNumber: ticketNumber });
});

// Cancel a registration
router.delete("/api/registrations/:ticketNumber", function (req, res) {
    var ticketNumber = req.params.ticketNumber;

    var updatedRegistrations = db.model.registrations.filter(function (reg) {
        return reg.ticketNumber !== ticketNumber;
    });

    if (updatedRegistrations.length === db.model.registrations.length) {
        return res.status(404).json({ error: "Ticket not found" });
    }

    db.model.registrations = updatedRegistrations;
    db.update();

    res.json({ message: "Registration canceled successfully" });
});

// View attendees for an event
router.get("/api/registrations/event/:eventName", function (req, res) {
    var eventName = req.params.eventName.toLowerCase();

    var attendees = db.model.registrations.filter(function (reg) {
        return reg.eventName.toLowerCase() === eventName;
    });

    res.json(attendees);
});

// Get registration details by user name
router.get("/api/registrations/byname/:name", function (req, res) {
    var name = req.params.name.toLowerCase();

    var registrations = db.model.registrations.filter(function (reg) {
        return reg.name.toLowerCase() === name;
    });

    res.json(registrations);
});

// Get all registrations
router.get("/api/registrations", function (req, res) {
    res.json(db.model.registrations);
});

module.exports = router;
