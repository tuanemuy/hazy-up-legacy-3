import { splitProps, getSlotCompoundVariant } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tooltipDefaultVariants = {}
const tooltipCompoundVariants = []

const tooltipSlotNames = [
  [
    "root",
    "tooltip__root"
  ],
  [
    "trigger",
    "tooltip__trigger"
  ],
  [
    "content",
    "tooltip__content"
  ]
]
const tooltipSlotFns = /* @__PURE__ */ tooltipSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, tooltipDefaultVariants, getSlotCompoundVariant(tooltipCompoundVariants, slotName))])

const tooltipFn = (props = {}) => {
  return Object.fromEntries(tooltipSlotFns.map(([slotName, slotFn]) => [slotName, slotFn(props)]))
}

const tooltipVariantKeys = []

export const tooltip = /* @__PURE__ */ Object.assign(tooltipFn, {
  __recipe__: false,
  __name__: 'tooltip',
  raw: (props) => props,
  variantKeys: tooltipVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, tooltipVariantKeys)
  },
})