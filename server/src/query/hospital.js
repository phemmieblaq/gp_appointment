const getHospitalsByState = `SELECT * FROM hospitals WHERE state = $1`;

module.exports = {
  getHospitalsByState,
};
