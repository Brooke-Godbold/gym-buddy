import { body, query } from "express-validator";

const stringRule = (field, optional) =>
  body(field)
    .optional(optional || false)
    .isString()
    .withMessage(`Field ${field} must be a string`)
    .trim()
    .not()
    .isEmpty()
    .withMessage(`Field ${field} cannot be empty`);

const integerRule = (field, optional, minValue, maxValue) =>
  body(field)
    .optional(optional || false)
    .not()
    .isEmpty()
    .withMessage(`Field ${field} cannot be empty`)
    .isInt({
      ...(minValue !== undefined && { min: minValue }),
      ...(maxValue && { max: maxValue }),
    })
    .withMessage(
      `Field ${field} must be an Integer${
        minValue !== undefined ? ` greater than ${minValue - 1}` : ""
      }${minValue && maxValue ? " and " : ""}${
        maxValue ? ` less than ${maxValue + 1}` : ""
      }`
    );

const booleanRule = (field, optional) =>
  body(field)
    .optional(optional || false)
    .isBoolean()
    .withMessage(`Field ${field} must be a boolean`);

const numericQueryRule = (queryValue, optional) =>
  query(queryValue)
    .optional(optional || false)
    .isNumeric()
    .trim()
    .not()
    .isEmpty()
    .withMessage(`Query ${queryValue} must be provided`);

const stringQueryRule = (queryValue, optional) =>
  query(queryValue)
    .optional(optional || false)
    .isString()
    .trim()
    .not()
    .isEmpty()
    .withMessage(`Query ${queryValue} must be provided`);

export {
  stringRule,
  integerRule,
  booleanRule,
  numericQueryRule,
  stringQueryRule,
};
