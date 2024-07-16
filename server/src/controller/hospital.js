const { getAllHospitalsByState } = require("../service/hospital");

exports.GetAllHospitalsByState = async (req, res, next) => {
  try {
    const state = req.params.state;
    const hospitals = await getAllHospitalsByState(state);
    return res.status(hospitals.statusCode).json({
      message: hospitals.message,
      data: hospitals.data,
      statusCode: hospitals.statusCode,
    });
  } catch (error) {
    next(error);
  }
};
