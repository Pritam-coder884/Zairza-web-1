const httpStatus = require("http-status");
const SkillsUser = require("../models/skills/skills.user.model");
const ApiError = require("../helpers/ApiError");

const loginSkillsUser = async (firebaseUid) => {
	const userInDb = await SkillsUser.findOne({ firebaseUid });

	if (!userInDb) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "User doesn't exists");
	}

	return userInDb;
};

const signUpSkillsUser = async (firebaseUid,otherDetails) => {
	const userInDb = await SkillsUser.findOne({ firebaseUid });

	if (userInDb) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "User already exists");
	}
	console.log("OtherDetails",otherDetails); 
	const createNewUser = await SkillsUser.create({ firebaseUid , ...otherDetails });

	return createNewUser;
};

module.exports = {
	loginSkillsUser,
	signUpSkillsUser,
};
