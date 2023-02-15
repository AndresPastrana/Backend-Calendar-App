const Event = require("../models/Event");

const getAllEvents = async (req, resp) => {
  // const { uid } = req;
  try {
    const events = await Event.find().populate("user", "username");
    return resp.json({
      ok: true,
      data: events,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      ok: false,
      msg: "Contacte al admin",
      error,
    });
  }
};
const getOneEvent = async (req, resp) => {
  try {
    const _id = req.params.id;
    const event = await Event.findOne({ _id }).populate("user", "username");

    if (!event) {
      return resp.json({
        ok: false,
        msg: `We could not find the event with the id ${_id}`,
        data: null,
      });
    }
    return resp.json({
      ok: true,
      msg: "Success",
      data: event,
    });
  } catch (error) {
    console.log(error);
  }
};

const insertEvent = async (req, resp) => {
  try {
    const { uid } = req;
    await Event.create({ ...req.body, user: uid }, (err, event) => {
      if (err) throw new Error(err);
      return resp.status(201).json({
        ok: true,
        msg: "Succes",
        data: event,
      });
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: "Conatcte al admin",
      error,
    });
  }
};
const deleteEvent = async (req, resp) => {
  const _id = req.params.id;
  const { uid } = req;

  try {
    // Check if the events exist and it belongs to the user that is trying to delete it
    const event = await Event.exists({ _id, user: uid });
    console.log(event);
    // Check if the event with the _id and belongs to uid exist
    if (!event) {
      return resp.status(400).json({
        ok: false,
        msg: `We could not find an elment with de id : ${_id}, or the current user cant delete this event`,
        data: null,
      });
    }

    await Event.deleteOne({ _id });
    return resp.json({ ok: true, data: event });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      ok: false,
      msg: "Contacte al admin",
      error: error,
    });
  }
};

const updateEvent = async (req, resp) => {
  console.log(req.params);
  try {
    const _id = req.params.id;
    const { uid } = req;

    const evetToUpdate = await Event.exists({ _id, user: uid });

    if (!evetToUpdate) {
      return resp.status(400).json({
        ok: false,
        msg: `We could not find an elment with de id : ${_id}, or the current user cant update this event`,
        data: null,
      });
    }

    const updatedEvent = await Event.updateOne({ _id }, { ...req.body });

    console.log(updatedEvent);
    return resp.json({
      ok: true,
      data: { id: _id, ...req.body, user: uid },
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      ok: false,
    });
  }
};

module.exports = {
  getAllEvents,
  getOneEvent,
  insertEvent,
  updateEvent,
  deleteEvent,
};
