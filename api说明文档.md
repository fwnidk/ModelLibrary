# 一、登录和注册
## 1. 登录信息
### 请求路径：/api/login
### 请求方式：post
### 请求参数：
```
{
    userName: string,
    password: string
}
```
### 请求数据样例：
```json
{
    "userName": "fwnidk",
    "password": "fwnidkfwnidk"
}
```
### 响应数据：
```
{
    "code": number,
    "msg": string,
    "data":string
}
```
### 响应数据样例：
```json
{
    "code": 1,
    "msg": "success",
    "data":"eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi5ZGo57uN5ZCbIiwiaWQiOjEsInVzZXJuYW1lIjoienNqIiwiZXhwIjoxNjgzODM2NDY4fQ.LoRPPqgxQQUomivcQjJu_fvAi5mwhZvbhPF1Ru2kyRg"
}
```

## 2. 获取个人信息
### 请求路径：/api/userInformation
### 请求方式：get
### 请求头：
```
header:
"token":"eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi5ZGo57uN5ZCbIiwiaWQiOjEsInVzZXJuYW1lIjoienNqIiwiZXhwIjoxNjgzODM2NDY4fQ.LoRPPqgxQQUomivcQjJu_fvAi5mwhZvbhPF1Ru2kyRg"
```
### 响应数据：
```
{
    "code": number,
    "msg": string,
    "data":[
        "personalInformation": {
        "userName": "string",
        "team": "string",
        "avatar": "...",
        },
    ]
}
```
### 响应数据样例
```json
{
    "code": 1,
    "msg": "success",
    "data":[
        "personalInformation": {
        "userName": "zsj",
        "team": "iSS",
        "avatar": "...",
        },
    ]
}
```
## 3. 验证注册用户，验证注册用户名是否重复

### 请求路径：/api/verifyUsername
### 请求方式：post
### 请求参数：
```
{
    userName: string,
    password: string
}
```
### 请求数据样例：
```json
{
    userName: "zsj",
    password: "123456"
}
```
### 响应数据：
```
number
```
### 响应数据样例：
```
0
```
## 4. 提交注册信息
### 请求路径：/api/signup
### 请求方式：post
### 请求参数：
```
{
    userName: string,
    password: string,
    avatar: any,
    researchInterests: string,
    team: string,
    entrydate: LocalDate,
    createTime: LocalDateTime,
    updateTime: LocalDateTime,
}
```
### 请求数据样例：
```json
{
    "userName": "zsj",
    "password": "123456",
    "avatar": [...],
    "researchInterests": "math",
    "team": "iSS",
    "entrydate": "2023-05-18",
    "createTime": "2023-05-18 20:01:35",
    "updateTime": "2023-05-18 20:11:35",        
}
```
### 响应数据：
```
{
    "code": number,
    "msg": string,
    "data":[]
}		
```
### 响应数据样例：
```
{
    "code": 1,
    "msg": "success",
         "data":"eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi5ZGo57uN5ZCbIiwiaWQiOjEsInVzZXJuYW1lIjoienNqIiwiZXhwIjoxNjgzODM2NDY4fQ.LoRPPqgxQQUomivcQjJu_fvAi5mwhZvbhPF1Ru2kyRg"
}
```
# 二、模型主页和数据集主页
## 1. model的列表信息
### 请求路径：/api/modelList
### 请求方式：get
### 响应数据：
```
{
    "code": number,
    "msg": string,
    "data": {
        "modelList":
        [{
                lastModified: string,
                name: string,
                author: string,
                downloads: number,
                id: number,
                type: "model"
            }
        ],
        numTotalItems: number,
    }
}

```
### 响应数据样例：
```json
{
    "code": 1,
    "msg": "",
    "data": {
        "modelList": [{
                "lastModified": "2023-05-09T17:51:00",
                "name": "Risxd Q gsmg",
                "author": "Susan Martin",
                "downloads": 3413,
                "id": 1,
                "type": "model"
            },
            //...一共30个
        ],
        "numTotalItems": 204961
    }
}

```
## 2. model的标签信息
### /api/modelLabel
### 响应数据：
```
{
    "code": number,
    "msg": string,
    "data": {
        task: Array<string> ,
        library: Array<string> ,
        dataset: Array<string> ,
        other: Array<string> ,
        language: Array<string>
    }
}

```
### 响应数据样例：
```json
{
    "code": 1,
    "msg": "",
    "data": {
        "task": [
            "LAPt",
            "X82hEM5",
        ],
        "library": [
            "cOs",
            "^xqCr",
        ],
        "dataset": [
            "LAPt",
            "X82hEM5",
        ],
        "other": [
            "6O*eid",
            "Z0PS",
        ],
        "language": [
            "qUVbfh",
            "iRYr",
        ]
    }
}

```
## 3. dataset的列表信息
### /api/datasetList
### 响应数据：
```
{
    "code": number,
    "msg": string,
    "data": {
        "modelList": [{
                lastModified: string,
                name: string,
                author: string,
                downloads: number,
                id: number,
                type: "dataset"
            }
        ],
        numTotalItems: number,
    }
}
```
### 响应数据样例：
```json
{
    "code": 1,
    "msg": "",
    "data": {
        "modelList": [{
                "lastModified": "2023-05-09T17:51:00",
                "name": "Risxd Q gsmg",
                "author": "Susan Martin",
                "downloads": 3413,
                "id": 1,
                "type": "dataset"
            },
            //...一共30个
        ],
        "numTotalItems": 204961
    }
}
```
## 4. dataset的标签信息
### /api/datasetLabel
### 响应数据：
```
{
    json
    "code": number,
    "msg": string,
    "data": {
        task: Array<string>,
        size: Array<string>,
        language: Array<string>,
        other: Array<string>,
    }
}
```
### 响应数据样例：
```json
{
    "code": 1,
    "msg": "",
    "data": {
        "task": [
            "LAPt",
            "X82hEM5",
        ],
        "size": [
            "cOs",
            "^xqCr",
        ],
        "language": [
            "qUVbfh",
            "iRYr",
        ]
        "other": [
            "6O*eid",
            "Z0PS",
        ],
    }
}
```