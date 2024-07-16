const { dbPool } = require("../config/dbConnection");

const { getHospitalsByState } = require("../query/hospital");

const getAllHospitalsByState = async (state) => {
  try {
    const hospitals = await dbPool.query(getHospitalsByState, [state]);
    if (hospitals.rowCount < 1) {
      throw new NotFound("No record found!");
    }

    return {
      message: `Hospitals in ${
        state.charAt(0).toUpperCase() + state.slice(1)
      } fetched successfully`,
      data: hospitals.rows,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllHospitalsByState,
};
