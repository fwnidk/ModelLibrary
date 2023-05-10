# 一、登录和注册
## 1. 登录信息
### 请求路径：/api/logIn
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
    personalInformation: {
            userName: string,
            team: string,
            avatar: string,
            reserchInterest: string,
            organizations: string,
        },
    logInStatus: number,
}
```
### 响应数据样例：
```json
{
    "personalInformation": {
        "userName": "Margaret Hernandez",
        "team": "&efS4jb",
        "avatar": "...",
        "reserchInterest": [
            "H1*Z("
        ],
        "organizations": [
            "3(T",
            "d)Ha@"
        ]
    },
    "logInStatus": 1
}
```
## 2. 验证注册用户，验证注册用户名是否重复
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
    userName: "fwnidk",
    password: "fwnidkfwnidk"
}
```
### 响应数据：
```
number
```
### 响应数据样例：
```
1
```
## 3. 提交注册信息
### 请求路径：/api/verifyUsername
### 请求方式：post
### 请求参数：
```
{
    userName: string,
    password: string,
    avatar: any,
    researchInterests: string,
    team: string,
}
```
### 请求数据样例：
```json
{
    "userName": "fwnidk",
    "password": "fwnidkfwnidk",
    "avatar": [...],
    "researchInterests": "asdfasdfasdf",
    "team": "asdf"
}
```
### 响应数据：
```
number
```
### 响应数据样例：
```
2
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
```
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