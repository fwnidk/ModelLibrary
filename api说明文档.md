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
        "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABDJJREFUeF7tl8GLzVEUx88wE2nGZEZCIRY2YjOytJSk7GxlJ3+BjSQbZS87bGenZOM/YKaUbCwIxWQM6U2SGUbH7fSOO7/fm/ed1+HQ967e+73zzjv387nn3vuGVmamVoQjDYEhCknj4lchFJLLB4Uk80EhFJKNQLJ6eIZQSDICycphh1BIMgLJymGHUEgyAsnKYYdQSDICycphh1BIMgLJymGHUEgyAsnKYYdQSDICycphh1BIMgLJymGHUEgyAsnKYYdQSDICycphh1BIMgLJymGHUEgyAsnKYYdQSDICycphh1BIMgLJymGHUEgyAsnKYYdQSDICycphh1BIMgLJymGHUEgyAsnKYYf880ImT4nsuSSycYvIh3sir651p7T7gsjOcyI/lkTeXBdZeJBsun2Ws++yyPYzIkvvRV5eEek87vOLg4fhHUIhg1PvkYFCmuD89x1iW9nQSJl+55HI84vl9cGbImPHRL6+KO83Hyhb4ejh8lpjdWiMDo17dra8rvP2yr34tGxDOuqtyAToZ9+/iCzOiIwfXx1ntWrcypLI3F2Rt7e6c6jlrmPLG6xD2lpPJ2VniJ+sjzcpNkn9zoYREZXmhSx/Fhke//2X7Oxqy22fN+W2TPb7TVItxgM9NF0WiB8mZfRId8H4z9MJ+TYvsv+qyMiO7gXAACx/KgfmrvNlMn7F6aQMgMnVZ3aZ8B3mAZgg6yITYrk7s916LMZ+x+BpPqvZno1Nrb6sWO66Ft9F9aWnbQG754N1yFq3LA+xLsZAT54uQurVZKD8hOtn/oLh89dC/Dbnt8jXN1YvGM1TnyETJ7vbXT0Pn9t3bNuiWUNKrJBNe8vKsrOjV7v7ifkOaRPy7naBObytu5e3dUibkLk7zVf4Woh1cRNMW0he2jplaPpYIb5D2trXr1g7rPsRsnC/wNRzxw5X66D1dEivLctg+7OxaavUZ/XC6mOb8iGxQvSPod9Tex3qaIeYEP2DasMuAP0K0QXQdDGwPE2S6i7/+FBk69FyTtbjjx/qa50h9k+9adL1TQgVotdmn1e/b1dbRIhC9ItGIXaeiEycaD/XDLx2zPy0iJ5lf00I2IIMxwjgWxaWn9EgAQoBgUWHU0g0YTA/hYDAosMpJJowmJ9CQGDR4RQSTRjMTyEgsOhwCokmDOanEBBYdDiFRBMG81MICCw6nEKiCYP5KQQEFh1OIdGEwfwUAgKLDqeQaMJgfgoBgUWHU0g0YTA/hYDAosMpJJowmJ9CQGDR4RQSTRjMTyEgsOhwCokmDOanEBBYdDiFRBMG81MICCw6nEKiCYP5KQQEFh1OIdGEwfwUAgKLDqeQaMJgfgoBgUWHU0g0YTA/hYDAosMpJJowmJ9CQGDR4RQSTRjMTyEgsOhwCokmDOanEBBYdDiFRBMG81MICCw6nEKiCYP5fwKuPyNm0ffLyQAAAABJRU5ErkJggg==",
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
    "avatar": [
        {
            "uid": "rc-upload-1682414993400-2",
            "lastModified": 1676188030390,
            "lastModifiedDate": "2023-02-12T07:47:10.390Z",
            "name": "屋敷童.jpg",
            "size": 65527,
            "type": "image/jpeg",
            "percent": 100,
            "originFileObj": {
                "uid": "rc-upload-1682414993400-2"
            },
            "status": "done",
            "response": true,
            "xhr": {
                "custom": {
                    "events": {},
                    "requestHeaders": {
                        "X-Requested-With": "XMLHttpRequest,MockXMLHttpRequest"
                    },
                    "responseHeaders": {},
                    "method": "post",
                    "url": "/api/avatarPost",
                    "async": true,
                    "options": {
                        "url": "/api/avatarPost",
                        "type": "post",
                        "body": {}
                    },
                    "timeout": 32,
                    "template": {
                        "rurl": "/api/avatarPost",
                        "rtype": "post"
                    }
                },
                "match": true,
                "readyState": 4,
                "status": 200,
                "statusText": "OK",
                "responseText": "true",
                "response": "true"
            }
        }
    ],
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
    "modelList": [{
        lastModified: number,
        name: string,
        author: string,
        downloads: number,
        id: string,
        type: "model"
    }],
    numTotalItems: number,
}
```
### 响应数据样例：
```json
{
    "modelList": [
        {
            "lastModified": 1675195018337,
            "name": "Risxd Q gsmg",
            "author": "Susan Martin",
            "downloads": 3413,
            "id": "T)sHn",
            "type": "model"
        },
        //...一共30个
    ],
    "numTotalItems": 204961
}
```
## 2. model的标签信息
### /api/modelLabel
### 响应数据：
```
{
    task: Array<string>,
    library: Array<string>,
    dataset: Array<string>,
    other: Array<string>,
    language: Array<string>
}
```
### 响应数据样例：
```json
{
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
```
## 3. dataset的列表信息
### /api/datasetList
### 响应数据：
```
{
    "datasetList": [{
        lastModified: number,
        name: string,
        author: string,
        downloads: number,
        id: string,
        type:"dataset"
    }],
    numTotalItems: number,
}
```
### 响应数据样例：
```json
{
    "datasetList": [
        {
            "lastModified": 1675195018337,
            "name": "Risxd Q gsmg",
            "author": "Susan Martin",
            "downloads": 3413,
            "id": "T)sHn",
            "type": "dataset"
        },
        //...一共30个
    ],
    "numTotalItems": 204961
}
```
## 4. dataset的标签信息
### /api/datasetLabel
### 响应数据：
```
{
    task: Array<string>,
    size: Array<string>,
    language: Array<string>,
    other: Array<string>,
}
```
### 响应数据样例：
```
{
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
```