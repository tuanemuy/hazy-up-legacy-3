import { mapObject, __spreadValues } from '../helpers.mjs';
import { css } from '../css/index.mjs';

const cardConfig = {
transform(props) {
  return __spreadValues({
    position: "relative",
    bg: "white",
    boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.2)",
    overflow: "hidden"
  }, props);
}}

export const getCardStyle = (styles = {}) => cardConfig.transform(styles, { map: mapObject })

export const card = (styles) => css(getCardStyle(styles))
card.raw = getCardStyle