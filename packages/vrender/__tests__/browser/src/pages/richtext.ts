import { createStage, createRichText, createGroup, createCircle, xul } from '@visactor/vrender';
import { addShapesToStage, colorPools } from '../utils';

// const urlPng = 'https://vega.github.io/images/idl-logo.png';
const svg =
  '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="6" fill="#FD9C87"></circle><circle opacity="0.6" cx="6" cy="6" r="1" stroke="white" stroke-width="2"></circle></svg>';

export const page = () => {
  const shapes = [];

  shapes.push(
    createRichText({
      visible: true,
      fontSize: 26,
      width: 0,
      // "textAlign": "center",
      textConfig: [
        {
          text: '我',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '们',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '是',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '无',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '缘',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '无',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '故',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '的',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '尘',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '埃\n',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '无',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '缘',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '无',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '故',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '的',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '游',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '走\n',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '黑',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '暗',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '只',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '需',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '要',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '张',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '开',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '一',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '张',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '缝',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '隙\n',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '就',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '能',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '挂',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '起',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '飓',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        },
        {
          text: '风\n',
          fontSize: 26,
          textAlign: 'center',
          fill: '#0f51b5'
        }
      ]
    })
  );

  shapes.push(
    createRichText({
      x: 100,
      y: 100,
      width: 300,
      height: 0,
      wordBreak: 'break-word',
      textConfig: [
        {
          text: 'Mapbox',
          fontWeight: 'bold',
          direction: 'vertical',
          fontSize: 30,
          fill: '#3f51b5'
        },
        {
          text: '公司成立于2010年，创立目标是为Google Map提供一个',
          fill: '#000'
        },
        {
          text: '替代方案',
          fontStyle: 'italic',
          fill: '#3f51b5'
        },
        {
          text: '。在当时，Google Map',
          fill: '#000'
        },
        {
          text: '地图',
          textDecoration: 'line-through',
          fill: '#000'
        },
        {
          text: '[1]',
          script: 'super',
          fill: '#000'
        },
        {
          // "lineHeight": 30,
          text: '几乎垄断了所有线上地图业务，但是在Google Map中，几乎没有定制化的可能，也没有任何工具可以让制图者按照他们的设想来创建地图',
          fill: '#000'
        },
        {
          // "lineHeight": 30,
          text: '。\n',

          fill: '#30ff05'
        },
        {
          lineHeight: 30,
          text: 'Mapbox的成立旨在改变这种状况，为制图人员和开发人员提供工具来创建他们想要的地图。值得一提的是，目前Mapbox提供的制图工具几乎都是开源的。\nMapbox目前主要提供地理数据、渲染客户端和其他与地图相关的服务。Mapbox GLabc JS是他们的一个开源客户端库，用于渲染Web端的可交互地图。作为Mapbox生态系统的一部分，它通常与Mapbox提供的其他服务集成在一起，统一对外使用。',
          fill: '#000'
        },
        {
          text: '\n目前Mapbox公司的主营业务除了地图相关产品，还包括LBS(Location Based Services)服务、自动驾驶、自有数据(Boundaries, Traffic Data, Movement)以及车机服务。',
          fill: '#000'
        }
        // {
        //   "text": "当前值 219,300\n",
        //   "fontSize": 20,
        //   "fill": true,
        //   "textAlign": "center",
        //   "fill": "#ccc",
        // },
        // {
        //   "text": "50%\n",
        //   "fontSize": 30,
        //   "fill": true,
        //   "textAlign": "center",
        //   "fill": "#000",
        // },
        // {
        //   "text": "利润",
        //   "fontSize": 20,
        //   "fill": true,
        //   "textAlign": "center",
        //   "fill": "#ccc",
        // },
      ]
    })
  );

  shapes.push(
    createRichText({
      x: 500,
      y: 100,
      width: 300,
      height: 0,
      textConfig: [
        {
          text: '图标测试',
          fontSize: 30,
          textAlign: 'center',
          textDecoration: 'underline',

          fill: '#0f51b5'
        },

        // textAlign
        {
          text: '\ntextAlign: left',
          fill: '#000'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 30,
          height: 30,
          backgroundWidth: 34,
          backgroundHeight: 34,
          backgroundShowMode: 'hover',

          id: 'circle-0'

          // margin: [0, 0, 10, 5]
        },
        {
          text: '\ntextAlign: center',
          fill: '#000',
          textAlign: 'center'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 30,
          height: 30,
          backgroundWidth: 34,
          backgroundHeight: 34,
          backgroundShowMode: 'hover',

          id: 'circle-1'
        },
        {
          text: '\ntextAlign: right',
          fill: '#000',
          textAlign: 'right'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 30,
          height: 30,
          backgroundWidth: 34,
          backgroundHeight: 34,
          backgroundShowMode: 'hover',

          id: 'circle-2'
        },

        // textBaseline
        {
          text: '\ntextBaseline: top',
          fill: '#000',
          textBaseline: 'top'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 30,
          height: 30,
          backgroundWidth: 34,
          backgroundHeight: 34,
          backgroundShowMode: 'hover',
          textBaseline: 'top',

          id: 'circle-3'
        },
        {
          text: '\ntextBaseline: middle',
          fill: '#000',
          textBaseline: 'middle'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 30,
          height: 30,
          backgroundWidth: 34,
          backgroundHeight: 34,
          backgroundShowMode: 'hover',
          textBaseline: 'middle',

          id: 'circle-4'
        },
        {
          text: '\ntextBaseline: alphabetic',
          fill: '#000',
          textBaseline: 'alphabetic'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 12,
          height: 12,
          backgroundWidth: 34,
          backgroundHeight: 34,
          backgroundShowMode: 'hover',
          textBaseline: 'alphabetic',

          id: 'circle-5'
        },
        {
          text: '\ntextBaseline: bottom',
          fill: '#000',
          textBaseline: 'bottom'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 30,
          height: 30,
          backgroundWidth: 34,
          backgroundHeight: 34,
          backgroundShowMode: 'hover',
          textBaseline: 'bottom',

          id: 'circle-6'
        },

        // wrap
        {
          text: '\nlong lone lone lone lone lone text warps line',
          fill: '#000',
          textAlign: 'left'
        },
        {
          text: ' line',
          fill: '#000',
          textAlign: 'left'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 30,
          height: 30,
          backgroundWidth: 34,
          backgroundHeight: 34,
          backgroundShowMode: 'hover',

          id: 'circle-7'
        },

        // pos
        {
          text: '\n'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 30,
          height: 30,
          backgroundWidth: 34,
          backgroundHeight: 34,
          backgroundShowMode: 'hover',

          id: 'circle-8'
        },
        {
          text: 'icon line start; ',
          fill: '#000',
          textAlign: 'left'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 30,
          height: 30,
          backgroundWidth: 34,
          backgroundHeight: 34,
          backgroundShowMode: 'hover',

          id: 'circle-9'
        },
        {
          text: 'icon line middle; ',
          fill: '#000',
          textAlign: 'left'
        },
        {
          text: 'icon line end',
          fill: '#000',
          textAlign: 'left'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 30,
          height: 30,
          backgroundWidth: 50,
          backgroundHeight: 50,
          backgroundShowMode: 'hover',

          id: 'circle-10'
        },
        {
          text: '\nmargin',
          fill: '#000',
          textAlign: 'left'
        },
        {
          // image: 'https://vega.github.io/images/idl-logo.png',
          image: svg,
          width: 30,
          height: 30,
          backgroundWidth: 50,
          backgroundHeight: 50,
          backgroundShowMode: 'hover',
          margin: [10, 5, 10, 10],
          cursor: 'pointer',

          id: 'circle-11'
        },
        {
          text: 'margin',
          fill: '#000',
          textAlign: 'left'
        },
        {
          text: '\nmargin margin margin',
          fill: '#000',
          textAlign: 'left'
        }
      ]
    })
  );
  shapes[shapes.length - 1].bindIconEvent();

  shapes.push(
    createRichText({
      x: 900,
      y: 100,
      width: 50,
      height: 150,
      layoutDirection: 'vertical',
      textConfig: [
        // {
        //   // lineHeight: 30,
        //   text: '中',
        //
        //   textAlign: 'left'
        // },
        // {
        //   // lineHeight: 30,
        //   text: '文',
        //
        //   textAlign: 'left'
        //   // rotate: -Math.PI / 3,
        // },
        // {
        //   // lineHeight: 30,
        //   text: '字',
        //
        //   textAlign: 'left'
        //   // rotate: Math.PI / 2,
        // },
        // {
        //   // lineHeight: 30,
        //   text: '符',
        //
        //   textAlign: 'left'
        //   // rotate: Math.PI,
        // },
        // {
        //   // lineHeight: 30,
        //   text: 'English',
        //
        //   textAlign: 'left',
        //   // rotate: Math.PI / 2,
        //   direction: 'vertical'
        //   // textDecoration: 'underline'
        // },
        // {
        //   // lineHeight: 30,
        //   text: 'n',
        //
        //   textAlign: 'left'
        //   // rotate: Math.PI / 3,
        // },
        // {
        //   // lineHeight: 30,
        //   text: 'g',
        //
        //   textAlign: 'left'
        //   // rotate: Math.PI / 2,
        // }

        {
          text: '这',

          // stroke: false,
          fontFamily:
            'PingFang SC,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif, apple color emoji,segoe ui emoji,segoe ui symbol',
          fontSize: 12,
          fontWeight: 'normal',
          // lineHeight: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          script: 'normal',
          fill: '#6F6F6F',
          stroke: 'black'
        },
        {
          text: '是',

          // stroke: false,
          fontFamily:
            'PingFang SC,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif, apple color emoji,segoe ui emoji,segoe ui symbol',
          fontSize: 12,
          fontWeight: 'normal',
          // lineHeight: 'normal',
          textDecoration: 'none',
          textAlign: 'right',
          script: 'normal',
          fill: '#6F6F6F',
          stroke: 'black'
        },
        {
          text: '一',

          // stroke: false,
          fontFamily:
            'PingFang SC,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif, apple color emoji,segoe ui emoji,segoe ui symbol',
          fontSize: 12,
          fontWeight: 'normal',
          // lineHeight: 'normal',
          textDecoration: 'none',
          textAlign: 'right',
          script: 'normal',
          fill: '#6F6F6F',
          stroke: 'black'
        },
        {
          text: '个',

          // stroke: false,
          fontFamily:
            'PingFang SC,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif, apple color emoji,segoe ui emoji,segoe ui symbol',
          fontSize: 12,
          fontWeight: 'normal',
          // lineHeight: 'normal',
          textDecoration: 'none',
          textAlign: 'right',
          script: 'normal',
          fill: '#6F6F6F',
          stroke: 'black'
        },
        {
          text: '汉',

          // stroke: false,
          fontFamily:
            'PingFang SC,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif, apple color emoji,segoe ui emoji,segoe ui symbol',
          fontSize: 12,
          fontWeight: 'normal',
          // lineHeight: 'normal',
          textDecoration: 'none',
          textAlign: 'right',
          script: 'normal',
          fill: '#6F6F6F',
          stroke: 'black'
        },
        {
          text: '【',
          direction: 'vertical',

          // stroke: false,
          fontFamily:
            'PingFang SC,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif, apple color emoji,segoe ui emoji,segoe ui symbol',
          fontSize: 12,
          fontWeight: 'normal',
          // lineHeight: 'normal',
          textDecoration: 'none',
          textAlign: 'right',
          script: 'normal',
          fill: '#6F6F6F',
          stroke: 'black'
        },
        {
          text: '放',

          // stroke: false,
          fontFamily:
            'PingFang SC,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif, apple color emoji,segoe ui emoji,segoe ui symbol',
          fontSize: 12,
          fontWeight: 'normal',
          // lineHeight: 'normal',
          textDecoration: 'none',
          textAlign: 'right',
          script: 'normal',
          fill: '#6F6F6F',
          stroke: 'black'
        },
        {
          text: '大',

          // stroke: false,
          fontFamily:
            'PingFang SC,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif, apple color emoji,segoe ui emoji,segoe ui symbol',
          fontSize: 12,
          fontWeight: 'normal',
          // lineHeight: 'normal',
          textDecoration: 'none',
          textAlign: 'right',
          script: 'normal',
          fill: '#6F6F6F',
          stroke: 'black'
        },
        {
          text: 'a0这是什么',
          direction: 'vertical',

          // stroke: false,
          fontFamily:
            'PingFang SC,Microsoft Yahei,system-ui,-apple-system,segoe ui,Roboto,Helvetica,Arial,sans-serif, apple color emoji,segoe ui emoji,segoe ui symbol',
          fontSize: 12,
          fontWeight: 'normal',
          // lineHeight: 'normal',
          textDecoration: 'none',
          textAlign: 'right',
          script: 'normal',
          fill: '#6F6F6F',
          stroke: 'black'
        }
      ]
    })
  );

  shapes.push(
    createCircle({
      x: 900,
      y: 300,
      radius: 5,
      fill: '#000'
    })
  );
  shapes.push(
    createRichText({
      x: 900,
      y: 300,
      width: 0,
      height: 0,
      textBaseline: 'middle',
      textConfig: [
        {
          text: '富文本全局',
          fill: '#000'
        },
        {
          text: '\ntextBaseline: middle',
          fill: '#000'
        }
      ],
      cursor: 'pointer'
    })
  );

  shapes.push(
    createCircle({
      x: 900,
      y: 400,
      radius: 5,
      fill: '#000'
    })
  );
  shapes.push(
    createRichText({
      x: 900,
      y: 400,
      width: 0,
      height: 0,
      textBaseline: 'bottom',
      textConfig: [
        {
          text: '富文本全局',
          fill: '#000'
        },
        {
          text: '\ntextBaseline: bottom',
          fill: '#000'
        }
      ]
    })
  );

  shapes.push(
    createCircle({
      x: 900,
      y: 500,
      radius: 5,
      fill: '#000'
    })
  );
  shapes.push(
    createRichText({
      x: 900,
      y: 500,
      width: 0,
      height: 0,
      textAlign: 'center',
      textConfig: [
        {
          text: '富文本全局',
          fill: '#000'
        },
        {
          text: '\ntextAlign: center',
          fill: '#000'
        }
      ]
    })
  );

  shapes.push(
    createCircle({
      x: 900,
      y: 600,
      radius: 5,
      fill: '#000'
    })
  );
  shapes.push(
    createRichText({
      x: 900,
      y: 600,
      width: 0,
      height: 0,
      textAlign: 'right',
      textConfig: [
        {
          text: '富文本全局',
          fill: '#000'
        },
        {
          text: '\ntextAlign: right',
          fill: '#000'
        }
      ]
    })
  );

  console.log(
    createRichText({
      x: 600,
      y: 600,
      width: 0,
      height: 0,
      textAlign: 'right',
      textConfig: xul(`<tc>
      <text attribute="fill: red;">富文本全局</text>
      <image attribute="image: ${svg
        .replaceAll('"', '&quot')
        .replaceAll('<', '&lt')
        .replaceAll('>', '&gt')};; width: 30; height: 30; id: circle-0;"></image>
      </tc>`)
    })
  );

  shapes.push(
    createRichText({
      x: 600,
      y: 600,
      width: 0,
      height: 0,
      textAlign: 'right',
      textConfig: xul(`<tc>
        <text attribute="fill: red;">富文本全局</text>
        <image attribute="image: ${svg
          .replaceAll('"', '&quot')
          .replaceAll('<', '&lt')
          .replaceAll('>', '&gt')};; width: 30; height: 30; id: circle-0;"></image>
        </tc>`)
    })
  );

  const stage = createStage({
    canvas: 'main',
    width: 1200,
    height: 700
    // viewWidth: 1200,
    // viewHeight: 600
  });

  const group = createGroup({});
  group.createOrUpdateChild('rt', { x: 10 }, 'richtext');
  console.log(group);

  // shapes[1].addEventListener('click', (e: any) => {
  //   // console.log(e.clone());
  //   console.log(shapes[1].pickIcon(e.global));
  // });

  // console.log(
  //   `<image attribute="image: ${svg
  //     .replaceAll("'", "\\'")
  //     .replaceAll('"', '\\"')}; width: 30; height: 30; id: circle-0" />`
  // );

  addShapesToStage(stage, shapes as any, true);
  stage.render();

  (window as any).stage = stage;
};
