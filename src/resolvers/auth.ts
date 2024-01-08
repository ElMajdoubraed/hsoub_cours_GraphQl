import User from "../models/user";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server-express";

const authResolver = {
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new UserInputError("هذا الحساب غير موجود لدينا!!");
      }
      const isEqual = await user.isPasswordMatch(password, user.password);
      if (!isEqual) {
        throw new UserInputError("خطأ في البريد الإلكتروني أو كلمة المرور!!");
      }
      const userForToken = {
        email: user.email,
        id: user.id,
      };
      return {
        userId: user.id,
        token: jwt.sign(userForToken, process.env.JWT_SECRET),
        username: user.username,
      };
    },

    createUser: async (_, args) => {
      try {
        const existingUser = await User.findOne({
          email: args.userInput.email,
        });
        if (existingUser) {
          throw new UserInputError("!!هذا الحساب موجود مسبقًا لدينا", {
            invalidArgs: args.userInput.email,
          });
        }
        const user = new User({
          username: args.userInput.username,
          email: args.userInput.email,
          password: args.userInput.password,
        });
        await user.save();
        const userForToken = {
          email: user.email,
          id: user.id,
        };
        return {
          userId: user.id,
          token: jwt.sign(userForToken, process.env.JWT_SECRET),
          username: user.username,
        };
      } catch (err) {
        throw err;
      }
    },
  },
};

export { authResolver };
