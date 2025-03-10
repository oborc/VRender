import type { IGroup } from '@visactor/vrender-core';
import { createGroup } from '@visactor/vrender-core';
import { AbstractComponent } from '../core/base';
import type { Tag } from '../tag';
import type { MarkerAttrs } from './type';

export abstract class Marker<T extends MarkerAttrs> extends AbstractComponent<Required<T>> {
  name = 'marker';
  private _containerClip!: IGroup;
  private _container!: IGroup;

  protected _label!: Tag;

  protected abstract setLabelPos(): any;
  protected abstract initMarker(container: IGroup): any;
  protected abstract updateMarker(): any;

  private _initContainer() {
    const { limitRect, clipInRange } = this.attribute;
    let group;
    if (clipInRange) {
      // 如果用户配置了剪切
      const groupClip = createGroup({
        ...limitRect,
        clip: true,
        pickable: false
      });
      group = createGroup({
        x: -(limitRect?.x ?? 0),
        y: -(limitRect?.y ?? 0),
        pickable: false
      });
      groupClip.add(group);
      this._containerClip = groupClip;
      this.add(groupClip);
    } else {
      group = createGroup({
        x: 0,
        y: 0,
        pickable: false
      });
      this.add(group);
    }
    group.name = 'marker-container';
    this._container = group;
  }

  private _updateContainer() {
    const { limitRect, clipInRange } = this.attribute;
    this._containerClip?.setAttributes({
      ...limitRect
    });
    this._container.setAttributes({
      x: clipInRange ? -(limitRect?.x ?? 0) : 0,
      y: clipInRange ? -(limitRect?.y ?? 0) : 0
    });
  }

  protected render() {
    // 因为标注本身不规则，所以默认将组件的 group 设置为不可拾取
    this.setAttribute('pickable', false);

    const markerVisible = this.attribute.visible ?? true;
    if (this.attribute.interactive === false) {
      this.setAttribute('childrenPickable', false);
    }

    if (markerVisible) {
      if (!this._container) {
        this._initContainer();
        this.initMarker(this._container);
      } else {
        this._updateContainer();
        this.updateMarker();
      }
    }
  }
}
