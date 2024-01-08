import { authResolver } from "./auth";
import { eventResolver } from "./event";
import bookingResolver from "./booking";
import { merge } from "lodash";

const resolvers = merge(authResolver, bookingResolver, eventResolver);

export default resolvers;
