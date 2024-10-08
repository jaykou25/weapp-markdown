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
