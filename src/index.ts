import { startApolloServer } from "./server";

// config .env
import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;

startApolloServer(PORT);
