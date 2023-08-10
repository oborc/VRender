import type { IAABBBounds } from '@visactor/vutils';
import type { IGraphicAttribute, IGraphic } from '../graphic';

export interface TextLayoutBBox {
  width: number; // 包围盒的宽度
  height: number; // 包围盒的高度
  xOffset: number;
  yOffset: number;
}

export interface LayoutItemType {
  str: string; // 这行的字符串
  leftOffset?: number; // 该行距离左侧的偏移
  topOffset?: number; // 该行距离右侧的偏移
  width: number;
}

export interface SimplifyLayoutType {
  lines: LayoutItemType[];
}

export interface LayoutType {
  bbox: TextLayoutBBox;
  lines: LayoutItemType[];
  fontFamily: string;
  fontSize: number;
  fontWeight?: string | number;
  lineHeight: number;
  textAlign: TextAlignType;
  textBaseline: TextBaselineType;
}

export type ITextAttribute = {
  text: string | number | string[] | number[];
  maxLineWidth: number;
  textAlign: TextAlignType;
  textBaseline: TextBaselineType;
  fontSize: number;
  fontFamily: string;
  fontWeight: string | number;
  ellipsis: boolean | string;
  fontVariant: string;
  fontStyle: string;
  lineHeight: number;
  underline: number;
  lineThrough: number;
  scaleIn3d: boolean;
  direction: 'horizontal' | 'vertical';
  wordBreak: 'break-word' | 'break-all';
  // textDecoration: number;
  // textDecorationWidth: number;
  // padding?: number | number[];
};
export type ITextCache = {
  // 单行文本的时候缓存用
  clipedText?: string;
  clipedWidth?: number;
  // 多行文本的布局缓存
  layoutData?: LayoutType;
  verticalList?: { text: string; width?: number; direction: number }[][];
};

export type ITextGraphicAttribute = Partial<IGraphicAttribute> & Partial<ITextAttribute>;

export type IWrapTextGraphicAttribute = ITextGraphicAttribute & {
  heightLimit?: number;
  lineClamp?: number;
};

export interface IText extends IGraphic<ITextGraphicAttribute> {
  // 判断是否被ellipisised
  clipedText?: string;
  clipedWidth?: number;
  cliped?: boolean;
  multilineLayout?: LayoutType;
  font?: string;
  cache?: ITextCache;

  updateMultilineAABBBounds: (text: (number | string)[]) => IAABBBounds;
  updateSingallineAABBBounds: (text: number | string) => IAABBBounds;
}

export type TextAlignType = 'left' | 'right' | 'center' | 'start' | 'end';
export type TextBaselineType = 'top' | 'middle' | 'bottom' | 'alphabetic';
