export const ImageCase = `
有两种方式创建图像, 一种是 markdown 语法, 另一种是 html 语法.

1. markdown 语法 \`![图像信息描述](src)\`. markdown 语法的缺点是不能控制图像的大小.
![悟空骑着精斗云](https://th.bing.com/th/id/R.bb20d834be38dcf1455c66388d4c83d5?rik=3cJRVVArkTm1zQ&riu=http%3a%2f%2fpic4.nipic.com%2f20090720%2f2988903_185938047_2.jpg&ehk=9Bf0MJQQAsnf6AYsN9sZ2ovp%2bHUHiM1380%2fKgeqNO78%3d&risl=&pid=ImgRaw&r=0)

2. html 语法 \`<img src='src' alt='图像信息描述' width=150 height=200 />\`. html 语法可以通过 width 和 height 属性控制图像大小.  
<img alt='悟空骑着筋斗云' width=150  src='https://th.bing.com/th/id/R.bb20d834be38dcf1455c66388d4c83d5?rik=3cJRVVArkTm1zQ&riu=http%3a%2f%2fpic4.nipic.com%2f20090720%2f2988903_185938047_2.jpg&ehk=9Bf0MJQQAsnf6AYsN9sZ2ovp%2bHUHiM1380%2fKgeqNO78%3d&risl=&pid=ImgRaw&r=0' />

3. 还可以用 \`figure\` 标签添加图片标题. align 属性可以控制居中.
<figure align='center' >
  <img alt='悟空骑着筋斗云' width=150 src='https://th.bing.com/th/id/R.bb20d834be38dcf1455c66388d4c83d5?rik=3cJRVVArkTm1zQ&riu=http%3a%2f%2fpic4.nipic.com%2f20090720%2f2988903_185938047_2.jpg&ehk=9Bf0MJQQAsnf6AYsN9sZ2ovp%2bHUHiM1380%2fKgeqNO78%3d&risl=&pid=ImgRaw&r=0' />
  <figcaption>悟空骑着筋斗云</悟空骑着筋斗云>
</figure>

`

export const ImageCaseFigure = `
<figure align='center' ><img alt='悟空骑着筋斗云' width=150 src='https://th.bing.com/th/id/R.bb20d834be38dcf1455c66388d4c83d5?rik=3cJRVVArkTm1zQ&riu=http%3a%2f%2fpic4.nipic.com%2f20090720%2f2988903_185938047_2.jpg&ehk=9Bf0MJQQAsnf6AYsN9sZ2ovp%2bHUHiM1380%2fKgeqNO78%3d&risl=&pid=ImgRaw&r=0' /><figcaption>悟空骑着筋斗云</悟空骑着筋斗云></figure>
`

export const ImageCaseFigure2 = `
<figure align='center' >
  <img alt='悟空骑着筋斗云' width=150 src='https://th.bing.com/th/id/R.bb20d834be38dcf1455c66388d4c83d5?rik=3cJRVVArkTm1zQ&riu=http%3a%2f%2fpic4.nipic.com%2f20090720%2f2988903_185938047_2.jpg&ehk=9Bf0MJQQAsnf6AYsN9sZ2ovp%2bHUHiM1380%2fKgeqNO78%3d&risl=&pid=ImgRaw&r=0' />
  <figcaption>悟空骑着筋斗云</悟空骑着筋斗云>
</figure>
`

export const ImageCaseTwoInRowH5 = `
两张图片应该并列显示:

<img width=100 src='https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg' /><img width=100 src='https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg' />
`

export const ImageCaseTwoInRowH52 = `
两张图片应该并列显示:

<img width=100 src='https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg' />
<img width=100 src='https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg' />
`
export const BlockLongPressCase = `
有两种方式创建链接, 一种是 markdown 语法, 另一种是 html 语法.

1. markdown 语法 \`[链接文本](url)\`
示例: [苹果官网](https://www.apple.com.cn)

2. html 语法 \`<a href='url'>链接文本</a>\`
示例: <a target='_blank' href='https://www.apple.com.cn'>苹果官网</a>
   1. 这种方法不太常见.
   2. 但是也有好处, 比如可以在新标签打开.
`

export const CodeCase = `
### git 相关
使用 \`git status\` 列出所有尚未提交的新文件或是修改过的文件.

\`\`\`bash
git status
git add
git commit
\`\`\`

### html 相关
举例来说，\`onMounted\` 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码：

\`\`\`html
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(\`the component is now mounted.\`)
})
</script>
\`\`\`
`

export const LinkCase = `
有两种方式创建链接, 一种是 markdown 语法, 另一种是 html 语法.

1. markdown 语法 \`[链接文本](url)\`
示例: [苹果官网](https://www.apple.com.cn)

2. html 语法 \`<a href='url'>链接文本</a>\`
示例: <a target='_blank' href='https://www.apple.com.cn'>苹果官网</a>
`

export const WrapLineCase = `
1. 应该换行 \`x\\ny\`

一行
二行

2. 含样式应该不换行

**加粗**和*斜体*

3. 含样式应该不换行

beforeText**加粗**和*斜体*

4. 含样式应该换行

**加粗**\n和\n*斜体*
`

export const ListCase = `
有序列表:
1. 一行
2. 二行

无序列表:
* 一行
* 二行

有序列表换行:
1. 一行

2. 二行

有序列表自起一行:
1. 一行
   自起
2. 二行

待办
- [X] 一行
- [ ] 二行

有序套嵌
1. 一行
   1. 内1
   2. 内2
2. 二行

有序套嵌2
1. 一行
   1. 内1
   2. 内2

2. 二行
`
