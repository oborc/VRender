import type {
  IGroup,
  IGroupGraphicAttribute,
  IImageGraphicAttribute,
  IPolygonAttribute,
  IRichTextGraphicAttribute,
  ISymbolGraphicAttribute
} from '@visactor/vrender-core';
import type { SegmentAttributes, SymbolAttributes } from '../segment';
import type { TagAttributes } from '../tag';
import type { Point } from '../core/type';

export enum IMarkLineLabelPosition {
  start = 'start',
  middle = 'middle',
  end = 'end',
  insideStartTop = 'insideStartTop',
  insideStartBottom = 'insideStartBottom',
  insideMiddleTop = 'insideMiddleTop',
  insideMiddleBottom = 'insideMiddleBottom',
  insideEndTop = 'insideEndTop',
  insideEndBottom = 'insideEndBottom'
}

export enum IMarkAreaLabelPosition {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
  middle = 'middle',
  insideLeft = 'insideLeft',
  insideRight = 'insideRight',
  insideTop = 'insideTop',
  insideBottom = 'insideBottom'
}

export enum IMarkPointItemPosition {
  top = 'top',
  bottom = 'bottom',
  middle = 'middle',
  insideTop = 'insideTop',
  insideBottom = 'insideBottom',
  insideMiddle = 'insideMiddle'
}

export type IMarkBackgroundAttributes = {
  /**
   * 是否绘制背景层
   */
  visible: boolean;
  /**
   * TODO: 根据文字宽度进行背景 panel size自适应
   */
  autoHeight?: boolean;
  /**
   * TODO: 根据文高度度进行背景 panel size自适应
   */
  autoWidth?: boolean;
} & Partial<SymbolAttributes>;

export interface IMarkLabel extends Omit<TagAttributes, 'x' | 'y' | 'panel'> {
  /**
   * 标签的背景面板配置
   */
  panel?: IMarkBackgroundAttributes;
}

export interface IMarkRef {
  /**
   * 自动旋转，沿着线的方向，默认 true
   */
  autoRotate?: boolean;
  /**
   * label 相对line平行方向上的偏移
   */
  refX?: number;
  /**
   * label 相对line正交方向上的偏移
   */
  refY?: number;
  /**
   * label 相对默认角度的偏移 （label跟随line的角度做自动旋转时，默认按照line的平行向量作为初始角度）
   */
  refAngle?: number;
}

export interface MarkerAttrs extends IGroupGraphicAttribute {
  type?: 'line' | 'area' | 'point';
  /**
   * 是否支持交互
   * @default false
   */
  interactive?: boolean;
  /**
   * 是否显示marker组件
   * @default true
   */
  visible?: boolean;
  /**
   * 是否将组件在绘制区域内进行剪切
   * @default true
   */
  clipInRange?: boolean;
  /**
   * 组件绘制范围配置
   */
  limitRect?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface MarkLineAttrs extends MarkerAttrs, SegmentAttributes {
  type?: 'line';
  /**
   * 构成line的点: 如果是两个点，则为直线；多个点则为曲线
   */
  points: Point[] | Point[][];

  /**
   * 标签
   */
  label?: {
    /**
     * label 相对line的位置
     */
    position?: keyof typeof IMarkLineLabelPosition;
    /**
     * 当 mark 配置了 clip 之后，label 是否自动调整位置
     */
    confine?: boolean;
  } & IMarkRef &
    IMarkLabel;
}

export interface MarkAreaAttrs extends MarkerAttrs {
  type?: 'area';
  /**
   * 构成area的点
   */
  points: Point[];
  /**
   * 标签
   */
  label?: {
    position?: keyof typeof IMarkAreaLabelPosition;
    /**
     * 当 mark 配置了 clip 之后，label 是否自动调整位置
     */
    confine?: boolean;
  } & IMarkLabel;
  /**
   * area的样式
   */
  areaStyle?: IPolygonAttribute;
}

export interface IItemContent extends IMarkRef {
  /**
   * 标注类型
   */
  type?: 'symbol' | 'text' | 'image' | 'richText' | 'custom';
  position?: keyof typeof IMarkPointItemPosition;
  /**
   * x 方向偏移量
   */
  offsetX?: number;
  /**
   * y 方向偏移量
   */
  offsetY?: number;
  /**
   * type为symbol时, symbol的样式
   */
  symbolStyle?: ISymbolGraphicAttribute;
  /**
   * type为image时, image的样式
   */
  imageStyle?: IImageGraphicAttribute;
  /**
   * type为text时, text的配置
   */
  textStyle?: IMarkLabel;
  /**
   * type为rich text时, rich text的样式
   */
  richTextStyle?: IRichTextGraphicAttribute;
  /**
   * type为custom时，允许以callback的方式传入需要render的item
   */
  renderCustomCallback?: () => IGroup;
  // /**
  //  * 当 mark 配置了 clip 之后，label 是否自动调整位置
  //  */
  // confine?: boolean;
}

export type IItemLine = {
  /** TODO：'type-opo' */
  type?: 'type-s' | 'type-do' | 'type-po' | 'type-op';
  visible?: boolean;
  /**
   * 垂直于引导线的装饰线，参考案例: https://observablehq.com/@mikelotis/edmonton-population-history-line-chart
   */
  decorativeLine?: {
    visible?: boolean;
    length?: number;
  };
} & Omit<SegmentAttributes, 'points'>;

export interface MarkPointAttrs extends Omit<MarkerAttrs, 'labelStyle'> {
  /**
   * markPoint的位置（也是path的起点）
   */
  position: Point;
  /**
   * 标注引导线
   */
  itemLine?: IItemLine;

  /**
   * 标注内容
   */
  itemContent?: IItemContent;
}
