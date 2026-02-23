export const healthCheck = (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Frontend is running 🚚"
  });
};
