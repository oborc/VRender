/**
 * @description 标签组件
 */
import type { IGroup, IRect, ISymbol, IText, ITextAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import { isBoolean, isEmpty, isNil, isNumber, isValid, merge, normalizePadding } from '@visactor/vutils';
import { AbstractComponent } from '../core/base';
import { measureTextSize } from '../util';
import type { BackgroundAttributes } from '../interface';
import type { TagAttributes, TagShapeAttributes } from './type';

export class Tag extends AbstractComponent<Required<TagAttributes>> {
  name = 'tag';

  static defaultAttributes: Partial<TagAttributes> = {
    visible: true,
    textStyle: {
      fontSize: 12,
      fill: '#000',
      textAlign: 'left',
      textBaseline: 'top'
    },
    space: 4,
    padding: 4,
    // @ts-ignore
    shape: {
      fill: '#000'
    }
  };

  constructor(attributes: TagAttributes) {
    super(merge({}, Tag.defaultAttributes, attributes));
  }

  protected render() {
    const {
      text = '',
      textStyle = {} as ITextGraphicAttribute,
      shape = {} as TagShapeAttributes,
      panel = {} as BackgroundAttributes,
      space = 4,
      minWidth,
      maxWidth,
      padding = 4,
      visible,
      state
    } = this.attribute as TagAttributes;
    const parsedPadding = normalizePadding(padding);

    const group = this.createOrUpdateChild('tag-content', { x: 0, y: 0, zIndex: 1 }, 'group') as IGroup;

    let symbol;
    let tagWidth = parsedPadding[1] + parsedPadding[3];
    let tagHeight = parsedPadding[0] + parsedPadding[2];
    let textX = 0;
    let symbolPlaceWidth = 0;
    const { visible: shapeVisible, ...shapeStyle } = shape;
    if (isBoolean(shapeVisible)) {
      const size = shapeStyle?.size || 10;
      const maxSize = isNumber(size) ? size : Math.max(size[0], size[1]);

      symbol = group.createOrUpdateChild(
        'tag-shape',
        {
          symbolType: 'circle',
          size,
          strokeBoundsBuffer: 0,
          ...shapeStyle,
          visible: shapeVisible,
          x: maxSize / 2,
          y: maxSize / 2
        },
        'symbol'
      ) as ISymbol;
      if (!isEmpty(state?.shape)) {
        symbol.states = state.shape;
      }

      if (shapeVisible) {
        symbolPlaceWidth = maxSize + space;
      }
    }

    tagWidth += symbolPlaceWidth;
    textX += symbolPlaceWidth;

    const textAttrs = {
      text,
      visible: isValid(text) && visible !== false,
      lineHeight: textStyle?.fontSize,
      ...textStyle,
      x: textX,
      y: 0
    };
    if (isNil(textAttrs.lineHeight)) {
      textAttrs.lineHeight = textAttrs.fontSize;
    }
    const textShape = group.createOrUpdateChild('tag-text', textAttrs, 'text') as IText;
    if (!isEmpty(state?.text)) {
      textShape.states = state.text;
    }

    // 因为文本可能发生旋转，所以需要使用 measureTextSize 方法
    const textBounds = measureTextSize(textAttrs.text, textStyle);
    const textWidth = textBounds.width;
    const textHeight = textBounds.height;
    tagWidth += textWidth;
    const size = shape.size ?? 10;
    const maxSize = isNumber(size) ? size : Math.max(size[0], size[1]);
    tagHeight += Math.max(textHeight, shape?.visible ? maxSize : 0);

    const { textAlign, textBaseline } = textStyle as ITextAttribute;

    if (isValid(minWidth) || isValid(maxWidth)) {
      if (isValid(minWidth) && tagWidth < minWidth) {
        tagWidth = minWidth;
      }
      if (isValid(maxWidth) && tagWidth > maxWidth) {
        tagWidth = maxWidth;
        textShape.setAttribute('maxLineWidth', maxWidth - parsedPadding[1] - parsedPadding[2]);
      }
    }

    let x = 0;
    let y = 0;
    if (textAlign === 'center') {
      x -= tagWidth / 2;
      if (symbol) {
        symbol.setAttribute('x', (symbol.attribute.x || 0) - textWidth / 2);
      }

      group.setAttribute('x', -symbolPlaceWidth / 2);
    } else if (textAlign === 'right' || textAlign === 'end') {
      x -= tagWidth;
      if (symbol) {
        symbol.setAttribute('x', (symbol.attribute.x || 0) - textWidth);
      }

      group.setAttribute('x', -parsedPadding[1] - symbolPlaceWidth);
    } else if (textAlign === 'left' || textAlign === 'start') {
      group.setAttribute('x', parsedPadding[3]);
    }
    if (textBaseline === 'middle') {
      y -= tagHeight / 2;
      if (symbol) {
        symbol.setAttribute('y', 0);
      }
    } else if (textBaseline === 'bottom') {
      y -= tagHeight;
      if (symbol) {
        symbol.setAttribute('y', -textHeight / 2);
      }

      group.setAttribute('y', -parsedPadding[2]);
    } else if (textBaseline === 'top') {
      group.setAttribute('y', parsedPadding[0]);
      if (symbol) {
        symbol.setAttribute('y', textHeight / 2);
      }
    }

    // 绘制背景层
    const { visible: bgVisible, ...backgroundStyle } = panel;
    if (visible && isBoolean(bgVisible)) {
      const bgRect = this.createOrUpdateChild(
        'tag-panel',
        {
          ...backgroundStyle,
          visible: bgVisible && !!text,
          x,
          y,
          width: tagWidth,
          height: tagHeight
        },
        'rect'
      ) as IRect;
      if (!isEmpty(state?.panel)) {
        bgRect.states = state.panel;
      }
    }
  }
}
