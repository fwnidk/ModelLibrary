---
title: 模型管理系统 v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.17"

---

# 模型管理系统

> v1.0.0

Base URLs:

* <a href="http://prod-cn.your-api-server.com">正式环境: http://prod-cn.your-api-server.com</a>

* <a href="http://localhost:3000">开发环境: http://localhost:3000</a>

* <a href="http://test-cn.your-api-server.com">测试环境: http://test-cn.your-api-server.com</a>

# 模型/数据集 主页面

## GET modelLabel

GET /api/modelLabel

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |none|

> 返回示例

> 成功

```json
{
  "code": 0,
  "msg": "no login",
  "data": {
    "task": [
      "Robotics",
      "Feature Extraction",
      "Text-to-Image",
      "Image-to-Text",
      "Text-to-Video",
      "Visual Question Answering",
      "Audio-to-Audio",
      "Token Classification",
      "Object Detection",
      "Image Segmentation",
      "Zero-Shot Classification",
      "Audio Classification"
    ],
    "library": [
      "SpanMarker",
      "TF Lite",
      "Sentence Transformers",
      "Timm",
      "Adapter Transformers",
      "Rust",
      "PaddlePaddle",
      "OpenCLIP",
      "ESPnet",
      "Stanza",
      "NeMo"
    ],
    "dataset": [
      "wikipedia",
      "mozilla-foundation/common_voice_11_0",
      "conll2003",
      "clinc_oos",
      "wmt16",
      "universal_dependencies",
      "sst2",
      "billsum",
      "snli",
      "amazon_reviews_multi"
    ],
    "language": [
      "Spanish",
      "Japanese",
      "German",
      "Hindi",
      "Finnish",
      "Bengali",
      "Danish",
      "Estonian",
      "Tamil",
      "English"
    ],
    "other": [
      "Carbon Emissions",
      "Eval Results",
      "Has a Space",
      "AutoTrain Compatible"
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» task|[string]|true|none||none|
|»» library|[string]|true|none||none|
|»» dataset|[string]|true|none||none|
|»» language|[string]|true|none||none|
|»» other|[string]|true|none||none|

## GET modelList

GET /modelList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|task|query|string| 否 |none|
|library|query|string| 否 |none|
|dataset|query|string| 否 |none|
|other|query|string| 否 |none|
|language|query|string| 否 |none|
|pageIndex|query|integer| 否 |none|
|sortType|query|string| 否 |none|
|name|query|string| 否 |none|

> 返回示例

> 成功

```json
{
  "code": 0,
  "msg": "no login",
  "data": {
    "modelList": [
      {
        "_id": "647de13137bf2df4147b8157",
        "name": "dslim/bert-base-NER",
        "author": "吴39凡",
        "lastModified": "2023/5/9 16:37",
        "type": "model",
        "downloads": 717311
      },
      {
        "_id": "647de13137bf2df4147b819d",
        "name": "dslim/bert-base-NER-uncased",
        "author": "吴91凡",
        "lastModified": "2023/5/9 16:37",
        "type": "model",
        "downloads": 511441
      },
      {
        "_id": "647de13137bf2df4147b816b",
        "name": "shibing624/text2vec-base-chinese",
        "author": "吴70凡",
        "lastModified": "2023/5/8 7:10",
        "type": "model",
        "downloads": 821040
      },
      {
        "_id": "647de13137bf2df4147b8139",
        "name": "microsoft/resnet-18",
        "author": "吴9凡",
        "lastModified": "2023/5/8 11:19",
        "type": "model",
        "downloads": 591145
      },
      {
        "_id": "647de13137bf2df4147b81c1",
        "name": "hustvl/yolos-tiny",
        "author": "吴127凡",
        "lastModified": "2023/5/5 8:23",
        "type": "model",
        "downloads": 748506
      },
      {
        "_id": "647de13137bf2df4147b8244",
        "name": "deepset/minilm-uncased-squad2",
        "author": "吴276凡",
        "lastModified": "2023/5/5 7:22",
        "type": "model",
        "downloads": 276290
      },
      {
        "_id": "647de13137bf2df4147b823e",
        "name": "openai/whisper-base",
        "author": "吴268凡",
        "lastModified": "2023/5/5 14:19",
        "type": "model",
        "downloads": 338397
      },
      {
        "_id": "647de13137bf2df4147b816d",
        "name": "runwayml/stable-diffusion-v1-5",
        "author": "吴43凡",
        "lastModified": "2023/5/5 10:38",
        "type": "model",
        "downloads": 222465
      },
      {
        "_id": "647de13137bf2df4147b8255",
        "name": "entropy/roberta_zinc_480m",
        "author": "吴293凡",
        "lastModified": "2023/5/4 23:10",
        "type": "model",
        "downloads": 421469
      },
      {
        "_id": "647de13137bf2df4147b819f",
        "name": "dslim/bert-large-NER",
        "author": "吴93凡",
        "lastModified": "2023/5/2 18:47",
        "type": "model",
        "downloads": 880584
      },
      {
        "_id": "647de13137bf2df4147b8185",
        "name": "SG161222/Realistic_Vision_V1.4",
        "author": "吴96凡",
        "lastModified": "2023/5/2 14:39",
        "type": "model",
        "downloads": 221113
      },
      {
        "_id": "647de13137bf2df4147b816a",
        "name": "CompVis/stable-diffusion-v1-4",
        "author": "吴69凡",
        "lastModified": "2023/5/16 9:08",
        "type": "model",
        "downloads": 507186
      },
      {
        "_id": "647de13137bf2df4147b819c",
        "name": "Salesforce/blip-image-captioning-base",
        "author": "吴90凡",
        "lastModified": "2023/5/16 8:29",
        "type": "model",
        "downloads": 376346
      },
      {
        "_id": "647de13137bf2df4147b81b5",
        "name": "Salesforce/blip-image-captioning-large",
        "author": "吴144凡",
        "lastModified": "2023/5/16 8:29",
        "type": "model",
        "downloads": 100962
      },
      {
        "_id": "647de13137bf2df4147b8150",
        "name": "pyannote/segmentation",
        "author": "吴32凡",
        "lastModified": "2023/5/16 14:44",
        "type": "model",
        "downloads": 390389
      },
      {
        "_id": "647de13137bf2df4147b819b",
        "name": "THUDM/chatglm-6b",
        "author": "吴89凡",
        "lastModified": "2023/5/15 4:06",
        "type": "model",
        "downloads": 690390
      },
      {
        "_id": "647de13137bf2df4147b81ff",
        "name": "stabilityai/stable-diffusion-2-inpainting",
        "author": "吴210凡",
        "lastModified": "2023/5/15 22:41",
        "type": "model",
        "downloads": 620430
      },
      {
        "_id": "647de13137bf2df4147b8238",
        "name": "stabilityai/stable-diffusion-2",
        "author": "吴246凡",
        "lastModified": "2023/5/15 22:41",
        "type": "model",
        "downloads": 71827
      },
      {
        "_id": "647de13137bf2df4147b81b0",
        "name": "runwayml/stable-diffusion-inpainting",
        "author": "吴139凡",
        "lastModified": "2023/5/15 22:39",
        "type": "model",
        "downloads": 391024
      },
      {
        "_id": "647de13137bf2df4147b81bb",
        "name": "prompthero/openjourney",
        "author": "吴150凡",
        "lastModified": "2023/5/15 22:39",
        "type": "model",
        "downloads": 901787
      },
      {
        "_id": "647de13137bf2df4147b81f1",
        "name": "timbrooks/instruct-pix2pix",
        "author": "吴172凡",
        "lastModified": "2023/5/15 22:38",
        "type": "model",
        "downloads": 424873
      },
      {
        "_id": "647de13137bf2df4147b81c8",
        "name": "stabilityai/stable-diffusion-2-1",
        "author": "吴134凡",
        "lastModified": "2023/5/15 22:37",
        "type": "model",
        "downloads": 800028
      },
      {
        "_id": "647de13137bf2df4147b8184",
        "name": "stabilityai/stable-diffusion-2-1-base",
        "author": "吴84凡",
        "lastModified": "2023/5/15 22:34",
        "type": "model",
        "downloads": 596160
      },
      {
        "_id": "647de13137bf2df4147b81a9",
        "name": "BaptisteDoyen/camembert-base-xnli",
        "author": "吴121凡",
        "lastModified": "2023/5/13 17:00",
        "type": "model",
        "downloads": 770657
      },
      {
        "_id": "647de13137bf2df4147b8171",
        "name": "bigcode/santacoder",
        "author": "吴47凡",
        "lastModified": "2023/5/12 8:50",
        "type": "model",
        "downloads": 625608
      },
      {
        "_id": "647de13137bf2df4147b817a",
        "name": "cardiffnlp/twitter-xlm-roberta-base-sentiment",
        "author": "吴74凡",
        "lastModified": "2023/5/12 5:21",
        "type": "model",
        "downloads": 539915
      },
      {
        "_id": "647de13137bf2df4147b824a",
        "name": "Mizuiro-sakura/luke-japanese-base-finetuned-ner",
        "author": "吴282凡",
        "lastModified": "2023/5/12 0:36",
        "type": "model",
        "downloads": 134488
      },
      {
        "_id": "647de13137bf2df4147b814f",
        "name": "bigscience/bloom-560m",
        "author": "吴31凡",
        "lastModified": "2023/5/11 21:15",
        "type": "model",
        "downloads": 743450
      },
      {
        "_id": "647de13137bf2df4147b8131",
        "name": "facebook/dino-vitb16",
        "author": "吴1凡",
        "lastModified": "2023/5/10 16:23",
        "type": "model",
        "downloads": 306621
      },
      {
        "_id": "647de13137bf2df4147b81e7",
        "name": "lllyasviel/sd-controlnet-canny",
        "author": "吴174凡",
        "lastModified": "2023/5/1 19:33",
        "type": "model",
        "downloads": 670944
      }
    ],
    "numTotalItems": 300
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» modelList|[object]|true|none||none|
|»»» _id|string|true|none||none|
|»»» name|string|true|none||none|
|»»» author|string|true|none||none|
|»»» lastModified|string|true|none||none|
|»»» type|string|true|none||none|
|»»» downloads|integer|true|none||none|
|»» numTotalItems|integer|true|none||none|

# 登录/注册/个人信息

## POST login

POST /api/login

登录成功需要返回响应标头Authorization：jwt令牌

> Body 请求参数

```json
{
  "username": "fwnidk",
  "password": "123456"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |none|
|» password|body|string| 是 |none|

> 返回示例

> 成功

```json
{
  "code": 1,
  "msg": "success",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|string|true|none||none|

## GET personalInformation

GET /api/personalInformation

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |jwt令牌|

> 返回示例

> 成功

```json
{
  "code": 1,
  "msg": "success",
  "data": {
    "username": "fwnidk",
    "team": "iSS",
    "avatar": "/images/3cd5fe9833ac4c766468d1e1f5157060.jpg"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» username|string|true|none||none|
|»» team|string|true|none||none|
|»» avatar|string|true|none||none|

## POST register/verifyUsername

POST /api/register/verifyUsername

注册成功需要返回响应标头Authorization：jwt令牌

> Body 请求参数

```json
{
  "username": "fwindk"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |none|

> 返回示例

> 成功

```json
{
  "code": 1,
  "msg": "verification successful",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|string|true|none||none|

## POST register/submitUserInfo

POST /api/register/submitUserInfo

需要设置一个默认的头像路径，如果用户没有上传图片就使用默认的图片。注册成功后需要返回响应标头Authorization：jwt令牌

> Body 请求参数

```yaml
team: asdf
avatar: file://C:\Users\MECHREVO\Pictures\表情包\1-220126002K5508.jpg
username: asdfasdf
password: asdfasdfasdf

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Content-Type|header|string| 否 |同时上传文件和表单文字数据|
|body|body|object| 否 |none|
|» team|body|string| 否 |团队|
|» avatar|body|string(binary)| 否 |头像文件|
|» username|body|string| 否 |用户名|
|» password|body|string| 否 |密码|

> 返回示例

> 成功

```json
{
  "code": 1,
  "msg": "registration completed",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|string|true|none||none|

# 模型/数据集 项目增删改查

## GET model

GET /api/model

获取该模型项目的一些基本信息

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|query|string| 是 |none|

> 返回示例

> 成功

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "activeFilters": {
      "task": [
        "2cu3KY",
        "k*^Z",
        "to&1BFI",
        "O79vbS"
      ],
      "library": [
        "ND4",
        "rSG",
        "OUcPa"
      ],
      "dataset": [
        "YUSU2VE",
        "HNVtp",
        "N)$^"
      ],
      "other": [
        "8y!",
        "5EgT",
        "vb@417",
        "JTdF)",
        "[CEm"
      ],
      "language": [
        "n99M"
      ]
    },
    "options": {
      "lastModified": "2021-05-18T18:13:48.109Z",
      "lastModifiedInformation": "Update Dt oksocy",
      "name": "111",
      "author": "Michelle Walker",
      "avatar": "image/CIRY0lbkghAFJMuQvwtoKR6HTuYrAAAAAElFTkSuQmCC",
      "downloads": 5643,
      "id": "(IYjp%Z",
      "type": "model",
      "isPrivate": false
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» activeFilters|object|true|none||none|
|»»» task|[string]|true|none||none|
|»»» library|[string]|true|none||none|
|»»» dataset|[string]|true|none||none|
|»»» other|[string]|true|none||none|
|»»» language|[string]|true|none||none|
|»» options|object|true|none||none|
|»»» lastModified|string|true|none||none|
|»»» lastModifiedInformation|string|true|none||none|
|»»» name|string|true|none||none|
|»»» author|string|true|none||none|
|»»» avatar|string|true|none||none|
|»»» downloads|integer|true|none||none|
|»»» id|string|true|none||none|
|»»» type|string|true|none||none|
|»»» isPrivate|boolean|true|none||none|

## POST model

POST /api/model

创建新的模型项目

> Body 请求参数

```json
{}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 成功

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "activeFilters": {
      "task": [
        "2cu3KY",
        "k*^Z",
        "to&1BFI",
        "O79vbS"
      ],
      "library": [
        "ND4",
        "rSG",
        "OUcPa"
      ],
      "dataset": [
        "YUSU2VE",
        "HNVtp",
        "N)$^"
      ],
      "other": [
        "8y!",
        "5EgT",
        "vb@417",
        "JTdF)",
        "[CEm"
      ],
      "language": [
        "n99M"
      ]
    },
    "options": {
      "lastModified": "2021-05-18T18:13:48.109Z",
      "lastModifiedInformation": "Update Dt oksocy",
      "name": "111",
      "author": "Michelle Walker",
      "avatar": "image/CIRY0lbkghAFJMuQvwtoKR6HTuYrAAAAAElFTkSuQmCC",
      "downloads": 5643,
      "id": "(IYjp%Z",
      "type": "model",
      "isPrivate": false
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» activeFilters|object|true|none||none|
|»»» task|[string]|true|none||none|
|»»» library|[string]|true|none||none|
|»»» dataset|[string]|true|none||none|
|»»» other|[string]|true|none||none|
|»»» language|[string]|true|none||none|
|»» options|object|true|none||none|
|»»» lastModified|string|true|none||none|
|»»» lastModifiedInformation|string|true|none||none|
|»»» name|string|true|none||none|
|»»» author|string|true|none||none|
|»»» avatar|string|true|none||none|
|»»» downloads|integer|true|none||none|
|»»» id|string|true|none||none|
|»»» type|string|true|none||none|
|»»» isPrivate|boolean|true|none||none|

# 模型/数据集 文件增删改查

## GET filesTable

GET /api/filesTable

模型/数据集项目的文件列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|query|string| 否 |none|
|type|query|string| 否 |none|

> 返回示例

> 成功

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "filesTable": [
      {
        "key": "Su@",
        "fileName": "Xjxkzg Pzgd",
        "isAFolder": true,
        "lastModified": "2022-07-26T10:07:54.468Z",
        "lastModifiedInformation": "Update B-fshpvlzcjwi"
      },
      {
        "key": "8k[Nm",
        "fileName": "Cgpxhnb Nx pj",
        "isAFolder": true,
        "lastModified": "2021-12-01T06:27:05.334Z",
        "lastModifiedInformation": "Update Dnzdxdul,ghlay"
      },
      {
        "key": "^m&uXX",
        "fileName": "XssexsvfMiewne.bin",
        "isAFolder": false,
        "lastModified": "2021-07-22T03:40:13.384Z",
        "lastModifiedInformation": "Update Bwqduretp,gr",
        "size": 9407836036,
        "fileURL": "http://dummyimage.com/200x200"
      },
      {
        "key": "LBq",
        "fileName": "JfbplnSrnmb.ot",
        "isAFolder": false,
        "lastModified": "2022-05-21T16:38:59.598Z",
        "lastModifiedInformation": "Update -mwfavegxzx",
        "size": 1206311824,
        "fileURL": "http://dummyimage.com/200x200"
      },
      {
        "key": "j4#!FC",
        "fileName": "IdtggPpmg.json",
        "isAFolder": false,
        "lastModified": "2021-06-25T18:30:02.379Z",
        "lastModifiedInformation": "Update Kwrmjbmdtpctz",
        "size": 3167550961,
        "fileURL": "http://dummyimage.com/200x200"
      },
      {
        "key": "OH8YP",
        "fileName": "GypifmhobSgjlome.ts",
        "isAFolder": false,
        "lastModified": "2021-11-19T10:05:44.896Z",
        "lastModifiedInformation": "Update Dkqtgyxdf",
        "size": 9615959721,
        "fileURL": "http://dummyimage.com/200x200"
      },
      {
        "key": "dg!",
        "fileName": "QunlcvfiHejq.json",
        "isAFolder": false,
        "lastModified": "2021-08-13T22:11:17.522Z",
        "lastModifiedInformation": "Update Oyewcleev",
        "size": 135815716,
        "fileURL": "http://dummyimage.com/200x200"
      },
      {
        "key": "b0IsE",
        "fileName": "NopdqtTkss.json",
        "isAFolder": false,
        "lastModified": "2022-02-06T10:05:52.358Z",
        "lastModifiedInformation": "Update Amzsmmfwlyirsll ",
        "size": 68161536,
        "fileURL": "http://dummyimage.com/200x200"
      },
      {
        "key": ")pBu7g",
        "fileName": "PzhgvgHuhrlgdb.ts",
        "isAFolder": false,
        "lastModified": "2023-01-08T06:55:54.233Z",
        "lastModifiedInformation": "Update Hhcajrw rtfwgyqe,n",
        "size": 2916540025,
        "fileURL": "http://dummyimage.com/200x200"
      },
      {
        "key": "CKm(ih",
        "fileName": "FmkxbyUtl.md",
        "isAFolder": false,
        "lastModified": "2022-07-21T23:28:35.479Z",
        "lastModifiedInformation": "Update Kkxioejjtindryixxq",
        "size": 8162449,
        "fileURL": "http://dummyimage.com/200x200"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» filesTable|[object]|true|none||none|
|»»» key|string|true|none||none|
|»»» fileName|string|true|none||none|
|»»» isAFolder|boolean|true|none||none|
|»»» lastModified|string|true|none||none|
|»»» lastModifiedInformation|string|true|none||none|
|»»» size|integer|true|none||none|
|»»» fileURL|string|true|none||none|

# 数据模型

