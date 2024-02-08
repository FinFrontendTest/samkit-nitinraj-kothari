import moment from "moment";
import { Row } from "../../redux/tableSlice";

export const INITIAL_VALUE: Row = {
  id: "",
  name: "",
  email: "",
  contact: "",
  weekdays: {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  },
  gender: "",
  dob: moment(new Date()).format("YYYY-MM-DD"),
};
