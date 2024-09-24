import { setValue } from '../../constant'
import {
  ImageCase,
  ImageCaseFigure,
  ImageCaseFigure2,
  ImageCaseTwoInRowH5,
  ImageCaseTwoInRowH52,
} from './case'

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
            value:
              "### git 相关\n使用 `git status` 列出所有尚未提交的新文件或是修改过的文件.\n\n```bash\ngit status\ngit add\ngit commit\n```\n\n### html 相关\n举例来说，`onMounted` 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码：\n\n```html\n<script setup>\nimport { onMounted } from 'vue'\n\nonMounted(() => {\n  console.log(`the component is now mounted.`)\n})\n</script>\n```\n",
          },
          {
            id: 5,
            title: '链接 Link',
            value:
              "有两种方式创建链接, 一种是 markdown 语法, 另一种是 html 语法.\n\n1. markdown 语法 `[链接文本](url)`\n示例: [苹果官网](https://www.apple.com.cn)\n\n2. html 语法 `<a href='url'>链接文本</a>`\n示例: <a target='_blank' href='https://www.apple.com.cn'>苹果官网</a>",
          },
          {
            id: 6,
            title: '图像 Image',
            value: ImageCase,
          },
        ],
      },
      {
        title: '测试用例',
        data: [
          {
            id: 101,
            title: '换行',
            value:
              '纯段落\n纯段落2\n\n段落含样式:\n**加粗**和*斜体*\n\n纯段落含样式:\n之前**加粗**和*斜体*\n\n段落含样式:\n**加粗**\n和\n*斜体*\n\n段落3',
          },
          {
            id: 102,
            title: 'raw',
            value: '1 <p>hello</p> 2 \n <p>two</p>',
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
            value: '**加粗**\n__加粗__',
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

      wx.navigateTo({
        url: '/pages/detail/index',
      })
    },
  },
})
