import { setKey, setLineInfo, setValue } from '../../constant'
import {
  BlockLongPressCase,
  CodeCase,
  ImageCase,
  ImageCaseFigure,
  ImageCaseFigure2,
  ImageCaseTwoInRowH5,
  ImageCaseTwoInRowH52,
  LinkCase,
  ListCase,
  WrapLineCase,
} from './case'
import { redChild } from './wukong-red-child'
import { huangmei } from './wukongCase'

Component({
  data: {
    dataSource: [
      {
        title: '基础',
        data: [
          {
            id: 1,
            title: '标题 Headings',
            value:
              '# A first-level heading\n## A second-level heading\n### A third-level heading',
          },
          {
            id: 2,
            title: '装饰文字 Styleing text',
            value:
              '**加粗**\n__加粗__\n*斜体*\n_斜体_\n~~划线~~\n**加粗内含 _斜体_**\n***加粗并且斜体***\n这是一个<sub>下标</sub> \n这是一个<sup>上标</sup>',
          },
          {
            id: 3,
            title: '引用文本 Quoting',
            value:
              '一九四五年八月二十八日，毛泽东从延安飞重庆，同国民党进行了四十三天的谈判。其间柳亚子屡有诗赠毛，十月七日，毛书此词回赠。随即发表在重庆《新华日报》上，轰动一时。\n> 北国风光，千里冰封，万里雪飘。\n> 望长城内外，惟余莽莽；\n> 大河上下，顿失滔滔。\n> 山舞银蛇，原驰蜡象，欲与天公试比高。\n> 须晴日，看红妆素裹，分外妖娆。\n> \n> 江山如此多娇，\n> 引无数英雄竞折腰。\n> 惜秦皇汉武，略输文采；\n> 唐宗宋祖，稍逊风骚。\n> 一代天骄，成吉思汗，只识弯弓射大雕。\n> 俱往矣，数风流人物，还看今朝。',
          },
          {
            id: 4,
            title: '代码 Code',
            value: CodeCase,
          },
          {
            id: 5,
            title: '链接 Link',
            value: LinkCase,
          },
          {
            id: 6,
            title: '图像 Image',
            value: ImageCase,
          },
          {
            id: 8,
            title: '列表 List',
            value: ListCase,
          },
          {
            id: 7,
            title: '长按段落呼出菜单',
            value: BlockLongPressCase,
          },
        ],
      },
      {
        title: '高级示例',
        data: [
          {
            id: 101,
            title: '显示评论图标',
            key: 'showComment',
            lineInfo: {
              2: {
                comments: [
                  {
                    name: 'Byron_kk',
                    avatar:
                      'https://i2.hdslb.com/bfs/face/2e35a0e10d2f150f54a231a291bad638a080066e.jpg@64w_64h.jpg',
                    content:
                      '所以罗刹被灵山派屠灭，老君给灵山使个坏，留个罗刹根让他复仇是吧？',
                    createAt: '2024-08-29 22:21:59',
                  },
                  {
                    name: 'Super麦可馨',
                    avatar:
                      'https://i2.hdslb.com/bfs/face/a009d90faaa00baebe8138131dfceaca754b2fb8.jpg@64w_64h.jpg',
                    content:
                      '游戏里红孩儿的形象狡黠阴险，对老牛又是老匹夫又是老东西的，看起来目无尊长无法无天，看红孩儿和萍萍的影神图这孩子其实是刀子嘴豆腐心呀，只不过一心想要复仇',
                    createAt: '2024-08-28 14:31:23',
                  },
                  {
                    name: '奴为不永族家观乐',
                    avatar:
                      'https://i1.hdslb.com/bfs/face/7e72c58637ff26df68fb30939de078d2bbbfcdbe.jpg@64w_64h.jpg',
                    content:
                      '黑熊精讨伐大圣已经过去几百年了，后面善财被观音送回火焰山尽孝团聚，才有这第五章',
                    createAt: '2024-08-29 21:27:21',
                  },
                  {
                    name: 'miyisi',
                    avatar:
                      'https://i1.hdslb.com/bfs/face/d3055e82d1819ea420218250ba57cf2eca63c23c.jpg@64w_64h.jpg',
                    content:
                      '原著：面如傅粉三分白，唇若涂朱一表才。\n游戏：血津津的赤剥身躯，红媸媸的弯环腿足。',
                    createAt: '2024-10-22 14:32:09',
                  },
                  {
                    name: '福禄娃Fuluwa',
                    avatar:
                      'https://i2.hdslb.com/bfs/face/b4649c9a26cac7012355c205a61658d0b18e3ca0.jpg@64w_64h.jpg',
                    content:
                      '是大西天。红孩儿老家的夜叉国就是被灵山灭的，红孩儿看到的是他父亲夜叉王临死前给他的记忆。他父亲死之前被太上老君救了，用莲花收了夜叉王的精魄，然后让自己的女弟子 铁扇公主 喝了子母河的水生的红孩儿。但是他们一家人不属于灵山不属于天庭，所以下场很惨。',
                    createAt: '2024-9-21 14:10:51',
                  },
                  {
                    name: '索罗不是坏狐狸',
                    avatar:
                      'https://i2.hdslb.com/bfs/face/5a68bd4695f3acba12c3994930f5b59a7f88c323.jpg@64w_64h.jpg',
                    content:
                      '牛魔王的忧是身本忧，红孩儿的怒又何尝不是？圣婴圣婴，他一出生，这辈子的悲喜便已固定。三昧真火本是为了炼化五脏，可这股火，他怎么可能憋的住？一族之仇若是不报，还算得上夜叉王么？大圣的根器，已是他能接触到的能最快增长实力的法子了，碰不得又怎样？跪不下，那就站着。',
                    createAt: '2024-9-16 21:14:30',
                  },
                ],
              },
            },
            value: redChild,
          },
        ],
      },
      {
        title: '黑神话悟空 wiki 示意',
        data: [
          {
            id: 201,
            title: '妖王 - 黄眉',
            value: huangmei,
          },
        ],
      },
      {
        title: '测试用例',
        data: [
          {
            id: 101,
            title: '换行',
            value: WrapLineCase,
          },
          {
            id: 103,
            title: '两个h5图片紧挨着写',
            value: ImageCaseTwoInRowH5,
          },
          {
            id: 104,
            title: '两个h5图片换行写',
            value: ImageCaseTwoInRowH52,
          },
          {
            id: 105,
            title: 'figure标签紧挨着写',
            value: ImageCaseFigure,
          },
          {
            id: 106,
            title: 'figure标签换行写',
            value: ImageCaseFigure2,
          },

          {
            id: 'x',
            title: 'temp',
            value:
              'a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a',
          },
        ],
      },
    ],
  },
  methods: {
    toDetail(e) {
      const { currentTarget } = e
      const { id, parentIndex } = currentTarget.dataset || {}

      const target = this.data.dataSource[parentIndex].data.find(
        (li) => li.id === id
      )

      setValue(target.value)
      setKey(target.key)
      setLineInfo(target.lineInfo)

      wx.navigateTo({
        url: '/pages/detail/index',
      })
    },
  },
})
