const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const test = (_req, res) => {
  res.status(200).json({ message: "Hello from NodeJS" });
};



const createUser = async (req, res) => {
  try {
    console.log(req.body.user);
    const { laboratory, username, password } = req.body.user;

    const oldUser = await userModel.findOne({ username: username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    await userModel.create({
      laboratory: laboratory,
      username: username,
      password: encryptedPassword,
    });

    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await userModel.findOne({ username: username });
    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      // Create token
      const token = jwt.sign({ id: userExists._id }, process.env.TOKEN_KEY, {
        expiresIn: 3600,
      });
      // save user token
      userExists.token = token;
      await userExists.save();
      // user
      //res.status(200).json(userExists);
      res.status(200).json(token);
    } else {
      res.status(401).json("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const userAuth = async (req, res) => {
  const userInfo = await userModel.findOne({
    token: req.headers["x-access-token"],
  });
  try {
    const userJSON = {
      _id_root: userInfo._id, //changed from _id to _id_root
      laboratory: userInfo.laboratory,
      patients: userInfo.patients, //remove later?
    };
    res.status(200).json(userJSON);
  } catch (err) {
    res.status(500);
  }
};

const getPatients = async (req, res) => {
  const { _id_root } = req.params;

  const userInfo = await userModel.findOne({
    _id: _id_root,
  });

  res.status(200).json(userInfo.patients);
};

const deletePatient = async (req, res) => {
  const { _id_root, patientId } = req.params;
  await userModel.updateOne(
    {
      _id: _id_root,
    },
    { $pull: { patients: { _id: patientId } } }
  );
  res.status(204);
};

//update patient
const updatePatient = async (req, res) => {
  try {
    const { _id_root, patientId } = req.params;
    const { patient, file } = req.body;

    const patientUpdate = {
      ...patient,
      file: file,
    };

    const doc = await userModel.findById(_id_root);

    doc.patients.forEach((patient) => {
      if (patient._id == patientId) {
        patient.patient = patientUpdate;
      }
    });

    await doc.save();

    res.status(204);
  } catch (err) {
    res.status(500);
  }
};

const exam = async (req, res) => {
  const { patient, _id, file } = req.body;

  const patientUpdate = {
    ...patient,
    file: file,
    result: "Pending",
  };

  try {
    const userUpdate = await userModel.findOneAndUpdate(
      { _id: _id },
      { $push: { patients: { patient: patientUpdate } } },
      { new: true } // Return the updated document
    );
  } catch (err) {
    console.error("Error updating user:", err.message);
  }

  res.status(200).json({ message: "OK" });
};

module.exports = {
  test,
  createUser,
  loginUser,
  userAuth,
  getPatients,
  deletePatient,
  updatePatient,
  exam,
};
