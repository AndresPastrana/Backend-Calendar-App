const getAllProviders = (req, resp) => {
  return resp.json({
    msg: "getAllProviders OK",
  });
};
const getOneProvider = (req, resp) => {
  return resp.json({
    msg: "getOneProvider OK",
  });
};

const postProvider = (req, resp) => {
  const provider = req.body;
  return resp.json({
    msg: "postProvider OK",
  });
};
const deleteProvider = (req, resp) => {
  const { id } = req.params;
  return resp.json({
    msg: "deleteProvider OK",
  });
};

const updateProvider = (req, resp) => {
  const { id } = req.params;
  const updatedProvider = req.body;
  return resp.json({
    msg: "updatedProvider OK",
  });
};

module.exports = {
  getAllProviders,
  getOneProvider,
  postProvider,
  deleteProvider,
  updateProvider,
};
