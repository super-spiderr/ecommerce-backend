import User from "../models/User";

export const createUser = async (req: any, res: any) => {
  try {
    const { name, email, role } = req.body as {
      name: string;
      email: string;
      role: string;
    };

    const user = new User({ name, email, role });
    await user.save();

    return res.send({ message: `User ${name} created`, user });
  } catch (error: any) {
    // Duplicate email error
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).send({ error: "Email already exists" });
    }

    console.error("Error creating user:", error);
    return res.status(500).send({ error: "Failed to create user" });
  }
};

export const getUsers = async (req: any, res: any) => {
  try {
    const users = await User.find();
    return res.send({ users });
  } catch (error: any) {
    console.error("Error getting users:", error);
    return res.status(500).send({ error: "Failed to get users" });
  }
};