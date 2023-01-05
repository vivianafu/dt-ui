export enum Variants {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ORANGE = 'orange',
  GREEN = 'green',
  CANCEL = 'cancel',
  DANGER = 'danger',
}

export enum Sizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum BorderRadius {
  DEFAULT = 'default',
  FULL = 'full',
  NONE = 'none',
}

export type VariantTypes = Record<Variants, string>;
export type SizeTypes = Record<Sizes, string>;
export type BorderRadiusTypes = Record<BorderRadius, string>;
