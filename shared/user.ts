import {
  array,
  coerce,
  date,
  Infer,
  literal,
  object,
  optional,
  partial,
  pick,
  refine,
  string,
  Struct,
  union,
} from "superstruct";
import validator from "validator";

const orBlank = (x: Struct<any, null>) => union([x, literal("")]);
const toDate = coerce(date(), string(), (val) => new Date(val));

export const Experience = object({
  company: string(),
  position: string(),
  description: string(),
  startDate: toDate,
  endDate: optional(orBlank(toDate)),
});

export const User = object({
  name: string(),
  bio: optional(string()),
  userId: optional(string()), // optional except when sending back a user
  email: refine(string(), "email", (val) => validator.isEmail(val)),
  phone: optional(
    refine(string(), "phone", (val) => validator.isMobilePhone(val))
  ),
  location: optional(string()),
  homepage: optional(string()),
  language: optional(array(string())),
  skills: optional(array(string())),
  experience: optional(array(Experience)),
  title: optional(string()),
  school: optional(string()),
  major: optional(string()),
});

const editableProperties = Object.keys(User.schema).filter(
  (x) => x !== "userId"
) as (keyof User)[]; // userid should not be changeable

export const UserModify = pick(partial(User), editableProperties);
export type Experience = Infer<typeof Experience>;
export type User = Infer<typeof User>;
export type UserModify = Infer<typeof UserModify>;
