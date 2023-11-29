/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index';
import type { Properties } from '../types/csstype';
import type { PropertyValue } from '../types/prop-type';
import type { DistributiveOmit } from '../types/system-types';
import type { Tokens } from '../tokens/index';

export interface CardProperties {
   
}


interface CardStyles extends CardProperties, DistributiveOmit<SystemStyleObject, keyof CardProperties > {}

interface CardPatternFn {
  (styles?: CardStyles): string
  raw: (styles?: CardStyles) => SystemStyleObject
}


export declare const card: CardPatternFn;
