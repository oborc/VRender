import { inject, injectable, named } from '../../../common/inversify-lite';
import type {
  IGraphicAttribute,
  ICircle,
  IContext2d,
  IMarkAttribute,
  IThemeAttribute,
  ICircleRenderContribution,
  IDrawContext,
  IRenderService,
  IGraphicRender,
  IGraphicRenderDrawParams,
  IContributionProvider
} from '../../../interface';
import { getTheme } from '../../../graphic/theme';
import { CIRCLE_NUMBER_TYPE } from '../../../graphic/constants';
import { CircleRenderContribution } from './contributions/constants';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ContributionProvider } from '../../../common/contribution-provider';
import { drawPathProxy, fillVisible, runFill, runStroke, strokeVisible } from './utils';
import { BaseRenderContributionTime } from '../../../common/enums';
import { BaseRender } from './base-render';

@injectable()
export class DefaultCanvasCircleRender extends BaseRender<ICircle> implements IGraphicRender {
  type: 'circle';
  numberType: number = CIRCLE_NUMBER_TYPE;

  constructor(
    @inject(ContributionProvider)
    @named(CircleRenderContribution)
    protected readonly circleRenderContribitions: IContributionProvider<ICircleRenderContribution>
  ) {
    super();
    this.init(circleRenderContribitions);
  }

  drawShape(
    circle: ICircle,
    context: IContext2d,
    x: number,
    y: number,
    drawContext: IDrawContext,
    params?: IGraphicRenderDrawParams,
    fillCb?: (
      ctx: IContext2d,
      markAttribute: Partial<IMarkAttribute & IGraphicAttribute>,
      themeAttribute: IThemeAttribute
    ) => boolean,
    strokeCb?: (
      ctx: IContext2d,
      markAttribute: Partial<IMarkAttribute & IGraphicAttribute>,
      themeAttribute: IThemeAttribute
    ) => boolean
  ) {
    // const circleAttribute = graphicService.themeService.getCurrentTheme().circleAttribute;
    const circleAttribute = getTheme(circle, params?.theme).circle;
    const {
      radius = circleAttribute.radius,
      startAngle = circleAttribute.startAngle,
      endAngle = circleAttribute.endAngle,
      x: originX = circleAttribute.x,
      y: originY = circleAttribute.y
    } = circle.attribute;

    const data = this.valid(circle, circleAttribute, fillCb, strokeCb);
    if (!data) {
      return;
    }
    const { fVisible, sVisible, doFill, doStroke } = data;

    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle);
    context.closePath();

    // shadow
    context.setShadowBlendStyle && context.setShadowBlendStyle(circle, circle.attribute, circleAttribute);

    this.beforeRenderStep(
      circle,
      context,
      x,
      y,
      doFill,
      doStroke,
      fVisible,
      sVisible,
      circleAttribute,
      drawContext,
      fillCb,
      strokeCb
    );

    if (doFill) {
      if (fillCb) {
        fillCb(context, circle.attribute, circleAttribute);
      } else if (fVisible) {
        context.setCommonStyle(circle, circle.attribute, originX - x, originY - y, circleAttribute);
        context.fill();
      }
    }

    if (doStroke) {
      if (strokeCb) {
        strokeCb(context, circle.attribute, circleAttribute);
      } else if (sVisible) {
        context.setStrokeStyle(circle, circle.attribute, originX - x, originY - y, circleAttribute);
        context.stroke();
      }
    }

    this.afterRenderStep(
      circle,
      context,
      x,
      y,
      doFill,
      doStroke,
      fVisible,
      sVisible,
      circleAttribute,
      drawContext,
      fillCb,
      strokeCb
    );
  }

  draw(circle: ICircle, renderService: IRenderService, drawContext: IDrawContext, params?: IGraphicRenderDrawParams) {
    const circleAttribute = getTheme(circle, params?.theme).circle;
    this._draw(circle, circleAttribute, false, drawContext, params);
  }
}
