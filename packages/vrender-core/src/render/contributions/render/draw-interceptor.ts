import { injectable } from '../../../common/inversify-lite';
import { AABBBounds, pi2 } from '@visactor/vutils';
import { createGroup, mat3Tomat4, multiplyMat4Mat4 } from '../../../graphic';
import type {
  IArc,
  IContext2d,
  IDrawContext,
  IDrawContribution,
  IDrawItemInterceptorContribution,
  IGraphic,
  IGraphicAttribute,
  IGraphicRenderDrawParams,
  IGroup,
  ILayer,
  IRenderService
} from '../../../interface';
import { mat4Allocate } from '../../../allocator/matrix-allocate';
import { ARC3D_NUMBER_TYPE } from '../../../graphic/constants';

// 拦截器
export const DrawItemInterceptor = Symbol.for('DrawItemInterceptor');

// @injectable()
// export class DefaultDrawItemInterceptor implements IDrawItemInterceptor {
//   drawItem(graphic: IGraphic, renderService: IRenderService, params?: IGraphicRenderDrawParams): boolean {
//     return false;
//   }
// }

const tempDirtyBounds = new AABBBounds();
/**
 * 影子节点拦截器，用于渲染影子节点
 */
@injectable()
export class ShadowRootDrawItemInterceptorContribution implements IDrawItemInterceptorContribution {
  order: number = 1;
  afterDrawItem(
    graphic: IGraphic,
    renderService: IRenderService,
    drawContext: IDrawContext,
    drawContribution: IDrawContribution,
    params?: IGraphicRenderDrawParams
  ): boolean {
    if (graphic.attribute.shadowRootIdx > 0 || !graphic.attribute.shadowRootIdx) {
      this.drawItem(graphic, renderService, drawContext, drawContribution, params);
    }
    return false;
  }

  beforeDrawItem(
    graphic: IGraphic,
    renderService: IRenderService,
    drawContext: IDrawContext,
    drawContribution: IDrawContribution,
    params?: IGraphicRenderDrawParams
  ): boolean {
    if (graphic.attribute.shadowRootIdx < 0) {
      this.drawItem(graphic, renderService, drawContext, drawContribution, params);
    }
    return false;
  }

  protected drawItem(
    graphic: IGraphic,
    renderService: IRenderService,
    drawContext: IDrawContext,
    drawContribution: IDrawContribution,
    params?: IGraphicRenderDrawParams
  ): boolean {
    if (!graphic.shadowRoot) {
      return false;
    }

    const { context } = drawContext;
    context.highPerformanceSave();
    // 直接transform
    context.transformFromMatrix(graphic.transMatrix, true);

    // 变换dirtyBounds
    if (drawContribution.dirtyBounds && drawContribution.backupDirtyBounds) {
      tempDirtyBounds.copy(drawContribution.dirtyBounds);
      const m = graphic.globalTransMatrix.getInverse();
      drawContribution.dirtyBounds.copy(drawContribution.backupDirtyBounds).transformWithMatrix(m);
    }

    // 设置context的transform到上一个节点
    drawContribution.renderGroup(graphic.shadowRoot, drawContext);

    context.highPerformanceRestore();

    if (drawContribution.dirtyBounds && drawContribution.backupDirtyBounds) {
      drawContribution.dirtyBounds.copy(tempDirtyBounds);
    }

    return true;
  }
}

@injectable()
export class CommonDrawItemInterceptorContribution implements IDrawItemInterceptorContribution {
  order: number = 1;
  afterDrawItem(
    graphic: IGraphic,
    renderService: IRenderService,
    drawContext: IDrawContext,
    drawContribution: IDrawContribution,
    params?: IGraphicRenderDrawParams
  ): boolean {
    if (graphic.attribute.shadowRootIdx > 0 || !graphic.attribute.shadowRootIdx) {
      this.drawItem(graphic, renderService, drawContext, drawContribution, params);
    }
    return false;
  }

  beforeDrawItem(
    graphic: IGraphic,
    renderService: IRenderService,
    drawContext: IDrawContext,
    drawContribution: IDrawContribution,
    params?: IGraphicRenderDrawParams
  ): boolean {
    if (graphic.attribute.shadowRootIdx < 0) {
      this.drawItem(graphic, renderService, drawContext, drawContribution, params);
    }
    return false;
  }

  protected drawItem(
    graphic: IGraphic,
    renderService: IRenderService,
    drawContext: IDrawContext,
    drawContribution: IDrawContribution,
    params?: IGraphicRenderDrawParams
  ): boolean {
    if (!graphic.attribute._debug_bounds) {
      return false;
    }

    const { context } = drawContext;
    context.highPerformanceSave();
    // 直接transform
    graphic.parent && context.setTransformFromMatrix(graphic.parent.globalTransMatrix, true);
    graphic.glyphHost &&
      graphic.glyphHost.parent &&
      context.setTransformFromMatrix(graphic.glyphHost.parent.globalTransMatrix, true);

    const b = graphic.AABBBounds;

    if (graphic.attribute._debug_bounds !== true) {
      graphic.attribute._debug_bounds(context, graphic);
    }
    context.strokeRect(b.x1, b.y1, b.width(), b.height());

    context.highPerformanceRestore();

    return true;
  }
}

/**
 * 交互层节点拦截器，用于支持交互层图元
 */
@injectable()
export class InteractiveDrawItemInterceptorContribution implements IDrawItemInterceptorContribution {
  order: number = 1;
  processing: boolean;
  // afterDrawItem(
  //   graphic: IGraphic,
  //   renderService: IRenderService,
  //   drawContext: IDrawContext,
  //   drawContribution: IDrawContribution,
  //   params?: IGraphicRenderDrawParams
  // ): boolean {

  //   if (graphic.attribute.shadowRootIdx > 0 || !graphic.attribute.shadowRootIdx) {
  //     this.drawItem(graphic, renderService, drawContext, drawContribution, params);
  //   }
  //   return false;
  // }

  beforeDrawItem(
    graphic: IGraphic,
    renderService: IRenderService,
    drawContext: IDrawContext,
    drawContribution: IDrawContribution,
    params?: IGraphicRenderDrawParams
  ): boolean {
    if (this.processing) {
      return false;
    }
    // 判断是否在交互层
    if (graphic.baseGraphic) {
      return this.beforeDrawInteractive(graphic, renderService, drawContext, drawContribution, params);
    }
    return this.beforeSetInteractive(graphic, renderService, drawContext, drawContribution, params);
  }

  /**
   * 用于提升interactive
   * @param graphic
   * @param renderService
   * @param drawContext
   * @param drawContribution
   * @param params
   */
  beforeSetInteractive(
    graphic: IGraphic,
    renderService: IRenderService,
    drawContext: IDrawContext,
    drawContribution: IDrawContribution,
    params?: IGraphicRenderDrawParams
  ): boolean {
    let interactiveGraphic: IGraphic = graphic.interactiveGraphic;
    if (graphic.attribute.globalZIndex) {
      if (!interactiveGraphic) {
        interactiveGraphic = graphic.clone();
        graphic.interactiveGraphic = interactiveGraphic;
        interactiveGraphic.baseGraphic = graphic;
      }
      // 设置位置
      // const m = graphic.globalTransMatrix;
      interactiveGraphic.setAttributes(
        {
          globalZIndex: 0,
          zIndex: graphic.attribute.globalZIndex
        },
        false,
        { skipUpdateCallback: true }
      );
      // 添加到交互层中
      drawContext.stage.tryInitInteractiveLayer();
      const interactiveLayer = drawContext.stage.getLayer('_builtin_interactive');
      if (interactiveLayer) {
        const shadowRoot = this.getShadowRoot(interactiveLayer);
        shadowRoot.add(interactiveGraphic);
      }
      return true;
    } else if (interactiveGraphic) {
      // 从交互层中删除
      drawContext.stage.tryInitInteractiveLayer();
      const interactiveLayer = drawContext.stage.getLayer('_builtin_interactive');
      if (interactiveLayer) {
        const shadowRoot = this.getShadowRoot(interactiveLayer);
        shadowRoot.removeChild(interactiveGraphic);
      }
      graphic.interactiveGraphic = null;
      interactiveGraphic.baseGraphic = null;
    }
    return false;
  }

  /**
   * 用于绘制interactive
   * @param graphic
   * @param renderService
   * @param drawContext
   * @param drawContribution
   * @param params
   */
  beforeDrawInteractive(
    graphic: IGraphic,
    renderService: IRenderService,
    drawContext: IDrawContext,
    drawContribution: IDrawContribution,
    params?: IGraphicRenderDrawParams
  ): boolean {
    // 默认使用原始的图元
    const baseGraphic = graphic.baseGraphic as IGraphic;
    if (baseGraphic) {
      this.processing = true;
      const { context } = drawContext;
      context.highPerformanceSave();
      // 直接transform
      context.setTransformFromMatrix(baseGraphic.parent.globalTransMatrix, true);
      // context.fillRect(0, 0, 100, 100);
      // 设置context的transform到上一个节点
      baseGraphic.isContainer
        ? drawContribution.renderGroup(baseGraphic as IGroup, drawContext)
        : drawContribution.renderItem(baseGraphic, drawContext);

      context.highPerformanceRestore();
      this.processing = false;

      return true;
    }
    return false;
  }
  getShadowRoot(interactiveLayer: ILayer) {
    // 获取绑定影子节点的group
    let group = interactiveLayer.getElementById('_interactive_group') as IGroup;
    if (!group) {
      group = createGroup({});
      group.id = '_interactive_group';
      interactiveLayer.add(group);
    }
    return group.shadowRoot ?? group.attachShadow();
  }
}

/**
 * 3d拦截器，用于渲染3d视角
 */
@injectable()
export class Canvas3DDrawItemInterceptor implements IDrawItemInterceptorContribution {
  // canvas?: ICanvas;
  order: number = 1;

  beforeDrawItem(
    graphic: IGraphic,
    renderService: IRenderService,
    drawContext: IDrawContext,
    drawContribution: IDrawContribution,
    params?: IGraphicRenderDrawParams
  ) {
    if (!graphic.in3dMode || drawContext.in3dInterceptor) {
      return false;
    }

    drawContext.in3dInterceptor = true;
    const { context, stage } = renderService.drawParams;
    const canvas = context.canvas;

    // 使用3d模式渲染
    context.save();
    this.initCanvasCtx(context);
    context.camera = stage.camera;

    // 将三维矩阵换成四维矩阵
    const m = context.currentMatrix;
    m.a /= context.dpr;
    m.b /= context.dpr;
    m.c /= context.dpr;
    m.d /= context.dpr;
    m.e /= context.dpr;
    m.f /= context.dpr;
    const matrix = mat4Allocate.allocate();
    mat3Tomat4(matrix, m);
    const lastModelMatrix = context.modelMatrix;
    if (lastModelMatrix) {
      if (matrix) {
        const m = mat4Allocate.allocate();
        context.modelMatrix = multiplyMat4Mat4(m, lastModelMatrix, matrix);
      }
    } else {
      context.modelMatrix = matrix;
    }
    context.setTransform(1, 0, 0, 1, 0, 0, true);

    // 设置context的transform到上一个节点
    if (graphic.isContainer) {
      // hack逻辑，如果是饼图的话，需要依次绘制不同的边
      let isPie: boolean = false;
      let is3d: boolean = false;
      graphic.forEachChildren((c: IGraphic) => {
        isPie = c.numberType === ARC3D_NUMBER_TYPE;
        return !isPie;
      });
      graphic.forEachChildren((c: IGraphic) => {
        is3d = !!c.findFace;
        return !is3d;
      });
      if (isPie) {
        const children = graphic.getChildren() as IArc[];
        // 绘制内层
        // drawContext.hack_pieFace = 'inside';
        // drawContribution.renderGroup(graphic as IGroup, drawContext);
        // 绘制底部
        // drawContext.hack_pieFace = 'bottom';
        // drawContribution.renderGroup(graphic as IGroup, drawContext);
        // 绘制外部
        // 排序一下
        const sortedChildren = [...children];
        sortedChildren.sort((a, b) => {
          let angle1 = ((a.attribute.startAngle ?? 0) + (a.attribute.endAngle ?? 0)) / 2;
          let angle2 = ((b.attribute.startAngle ?? 0) + (b.attribute.endAngle ?? 0)) / 2;
          while (angle1 < 0) {
            angle1 += pi2;
          }
          while (angle2 < 0) {
            angle2 += pi2;
          }
          return angle2 - angle1;
        });
        sortedChildren.forEach(c => {
          c._next = null;
          c._prev = null;
        });
        graphic.removeAllChild();
        graphic.update();
        sortedChildren.forEach(c => {
          graphic.appendChild(c);
        });
        drawContext.hack_pieFace = 'outside';
        drawContribution.renderGroup(graphic as IGroup, drawContext);
        // 绘制内部
        drawContext.hack_pieFace = 'inside';
        drawContribution.renderGroup(graphic as IGroup, drawContext);
        // 绘制顶部
        drawContext.hack_pieFace = 'top';
        drawContribution.renderGroup(graphic as IGroup, drawContext);
        graphic.removeAllChild();
        children.forEach(c => {
          c._next = null;
          c._prev = null;
        });
        children.forEach(c => {
          graphic.appendChild(c);
        });
      } else if (is3d) {
        // 排序这些图元
        const children = graphic.getChildren() as IGraphic[];
        const zChildren = children.map(g => {
          const face3d = g.findFace();
          const vertices = face3d.vertices;
          // 计算每个顶点的view
          const viewdVerticesZ = vertices.map(v => {
            return context.view(v[0], v[1], v[2] + g.attribute.z ?? 0)[2];
          });
          const ave_z = viewdVerticesZ.reduce((a, b) => a + b, 0);
          return {
            ave_z,
            g
          };
        });
        zChildren.sort((a, b) => b.ave_z - a.ave_z);
        graphic.removeAllChild();
        zChildren.forEach(i => {
          i.g._next = null;
          i.g._prev = null;
        });
        graphic.update();
        zChildren.forEach(i => {
          graphic.add(i.g);
        });

        drawContribution.renderGroup(graphic as IGroup, drawContext, true);

        graphic.removeAllChild();
        children.forEach(g => {
          g._next = null;
          g._prev = null;
        });
        graphic.update();
        children.forEach(g => {
          graphic.add(g);
        });
      } else {
        drawContribution.renderGroup(graphic as IGroup, drawContext);
      }
    } else {
      drawContribution.renderItem(graphic, drawContext);
    }
    context.camera = null;
    context.restore();

    if (context.modelMatrix !== lastModelMatrix) {
      mat4Allocate.free(context.modelMatrix);
    }
    context.modelMatrix = lastModelMatrix;

    drawContext.in3dInterceptor = false;
    return true;
  }

  initCanvasCtx(context: IContext2d) {
    context.setTransformForCurrent();
  }
}
