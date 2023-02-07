const getAllEvents = (req, resp) => {
  return resp.json({
    msg: "getAllProviders OK",
  });
};
const getOneEvent = (req, resp) => {
  return resp.json({
    msg: "getOneProvider OK",
  });
};

const insertEvent = (req, resp) => {
  const provider = req.body;
  return resp.json({
    msg: "postProvider OK",
  });
};
const deleteEvent = (req, resp) => {
  const { id } = req.params;
  return resp.json({
    msg: "deleteProvider OK",
  });
};

const updateEvent = (req, resp) => {
  const { id } = req.params;
  const updatedProvider = req.body;
  return resp.json({
    msg: "updatedProvider OK",
  });
};

module.exports = {
  getAllEvents,
  getOneEvent,
  insertEvent,
  updateEvent,
  deleteEvent,
};
