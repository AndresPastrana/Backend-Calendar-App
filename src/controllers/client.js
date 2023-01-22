const getAllClients = (req, resp) => {
  return resp.json({
    msg: "getAllClients OK",
  });
};
const getOneClient = (req, resp) => {
  return resp.json({
    msg: "getOneClient OK",
  });
};

const postClient = (req, resp) => {
  const client = req.body;
  return resp.json({
    msg: "getOneClient OK",
  });
};
const deleteClient = (req, resp) => {
  const { id } = req.params;
};

const updateClient = (req, resp) => {
  const { id } = req.params;
  const updatedClient = req.body;
};

module.exports = {
  getAllClients,
  getOneClient,
  postClient,
  updateClient,
  deleteClient,
};
