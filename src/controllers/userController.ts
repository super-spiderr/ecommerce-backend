import User from "../models/User";

export const createUser = async (request: any, reply: any) => {
  try {
    const {
      name,
      email,
      authProvider,
      firebaseUID,
      isProfileComplete,
      firstName,
      lastName,
      photoURL,
      role,
      isActive,
    } = request.body;

    const user = new User({
      name,
      email,
      authProvider,
      firebaseUID,
      isProfileComplete,
      firstName,
      lastName,
      photoURL,
      role,
      isActive,
    });

    await user.save();
    return reply.send({ message: `User ${name} created`, user });
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return reply.status(400).send({ error: "Email already exists" });
    }
    console.error("Error creating user:", error);
    return reply.status(500).send({ error: "Failed to create user" });
  }
};

export const getUsers = async (request: any, reply: any) => {
  try {
    const users = await User.find();
    return reply.send({ users });
  } catch (error: any) {
    console.error("Error getting users:", error);
    return reply.status(500).send({ error: "Failed to get users" });
  }
};
