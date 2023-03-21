import Mock, { Random } from "mockjs"

Random.extend({
    tasksArr: function () {
        let tasksArr = ["Computer Vision", 'Multimodal', 'Natural Language Processing', 'Audio']
        return this.pick(tasksArr)
    }
})

const datasetSize = [
    "n<1K",
    "1K<n<10K",
    "10K<n<100K",
    "100K<n<1M",
    "1M<n<10M",
    "10M<n<100M",
    "100M<n<1B",
    "1B<n<10B",
    "10B<n<100B",
    "100B<n<1T",
    "n>1T",
]
Random.extend({
    datasetSize: function () {
        return this.pick(datasetSize)
    }
})

Random.extend({
    fileSize: function () {
        return Math.pow(Random.natural(0, 100000), 2)
    }
})

Random.extend({
    lastModifiedInformation: function () {
        return "Update " + Random.capitalize(Random.string('abcdefghijklmnopqrstuvwxyz ,-', 7, 20))
    }
})

Random.extend({
    fileName: function () {
        return Random.capitalize(Random.string('abcdefghijklmnopqrstuvwxyz -', 3, 9)) + " " + Random.capitalize(Random.string('abcdefghijklmnopqrstuvwxyz -', 3, 9))
    }
})
const fileType = ['.txt', '.py', '.md', '.json', '.bin', '.ot','.js','.ts','.java']
Random.extend({
    fileNameWithType: function () {
        return Random.capitalize(Random.string('abcdefghijklmnopqrstuvwxyz-', 3, 9)) + Random.capitalize(Random.string('abcdefghijklmnopqrstuvwxyz-', 3, 9)) + this.pick(fileType)
    }
})
Random.extend({
    paragraphNewLine: function () {
        // let num = Random.integer(12, 18)
        let num = Random.integer(1, 3)
        let str = Random.sentence()
        for (let i = 0; i < num; i++) {
            if (Random.boolean(2, 8, true)) {
                str = str + '\r\n' + Random.sentence()
            } else {
                str += `\r\n fwnidk fwnidk fwnidk fwnidk fwnidk fwnidk fwnidk fwnidk fwnidk fwnidk!`
            }
        }
        return str;
    }
})
// {
// loggedIn: "@boolean",
// loginInformation: 
const loginInformationArr = [1]
Random.extend({
    loginInformation: function () {
        return this.pick(loginInformationArr)
    }
})

const typearr = ["dataset", "model"]
Random.extend({
    type: function () {
        return this.pick(typearr)
    }
})

Random.extend({
    timeInteger: function () {
        return Random.integer(1600000000000, 1678280738712)
    }
})
// personalInformation: {
//     userName: "@string",
//     team: "@string",
//     avatar: Random.dataImage('200x200',)
// },

Random.extend({
    personalInformation: function () {
        let last = Random.last();
        let list = Mock.mock({
            'reserchInterest|0-3': ["@string"],
            'organizations|0-3': ["@string"],
        })
        return {
            userName: Random.first() + ' ' + last,
            team: Random.string(),
            avatar: Random.dataImage('100x100', last),
            reserchInterest: list.reserchInterest,
            organizations: list.organizations,
        }
    }
})

Random.extend({
    getSomeCode: function (fileType) {
        switch (fileType) {
            case 'py':
                return `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] + nums[j] == target:
                    return [i, j]
        
        return []`;
            case 'java':
                return `class Solution {
    public int[] twoSum(int[] nums, int target) {
        int n = nums.length;
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[0];
    }
}`
            case 'js':
                return `var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0, len = nums.length; i < len; i++){
        if(map.has(target - nums[i])){
            return [map.get(target - nums[i]), i];
        }else{
            map.set(nums[i], i);
        }
    }
    return [];
};`
            case 'json':
                return `{
    "reihblzeqpg": [
        [
            "QdYFGfORzhwBOooGnLJ",
            false,
            538335045
        ],
        1782553011.9898276,
        -1758639008.312018
    ],
    "cehgbpmyghe": {
        "elyrci": {
            "elpra": -1173064097.8641386
        },
        "nilxhro": 1231910590,
        "fnbkkk": 45709824.09524655
    },
    "lthecwytuvz": -602658516
}`
            default:
                return Random.paragraphNewLine();
        }
    }
})






export const createRandomModelLabelData = Mock.mock("/api/modelLabel",
    //返回多条条models数据 
    Mock.mock({
        "task|45-60": [["@string", "@tasksarr"]],
        "library|45-60": ["@string"],
        "dataset|45-60": ["@string"],
        "other|45-60": ["@string"],
        "language|20-25": ["@string"]
    })
)

//更新页数和sort
export const createRandomModelListDataUpdatePage = Mock.mock("/api/modelListPage",
    "post", function () {
        return Mock.mock({
            "modelList|30": [
                {
                    lastModified: "@timeInteger",
                    name: "@fileName",
                    author: "@first @last",
                    downloads: "@natural(0,10000)",
                    id: "@string",
                    type: "model"
                }],
        })
    }
)

// 其他更新情况，会返回一个新的numTotalItems
export const createRandomModelListData = Mock.mock("/api/modelList",
    "post", function () {
        return Mock.mock({
            "modelList|30": [{
                lastModified: "@timeInteger",
                name: "@fileName",
                author: "@first @last",
                downloads: "@natural(0,10000)",
                id: "@string",
                type: "model"
            }],
            numTotalItems: "@natural(0,1000000)",
        })
    }
)


export const createRandomDatasetLabelData = Mock.mock("/api/datasetLabel",
    //返回多条条datasets数据 
    Mock.mock({
        "task|45-60": [["@string", "@tasksarr"]],
        "size": datasetSize,
        "other|45-60": ["@string"],
        "language|45-60": ["@string"],
    })
)

export const createRandomDatasetListDataUpdatePage = Mock.mock("/api/datasetListPage",
    "post", function () {
        return Mock.mock({
            "datasetList|30": [
                {
                    lastModified: "@timeInteger",
                    name: "@fileName",
                    author: "@first @last",
                    downloads: "@natural(0,10000)",
                    id: "@string",
                    type: "dataset"
                }],
        })
    }
)

// 其他更新情况，会返回一个新的numTotalItems
export const createRandomDatasetListData = Mock.mock("/api/datasetList",
    "post", function () {
        return Mock.mock({
            "datasetList|30": [
                {
                    lastModified: "@timeInteger",
                    name: "@fileName",
                    author: "@first @last",
                    downloads: "@natural(0,10000)",
                    id: "@string",
                    type: "dataset"
                }],
            numTotalItems: "@natural(0,1000000)",
        })
    }
)

export const createRandomDatsetDetailData = Mock.mock("/api/datasetDetail",
    "post", function (post) {
        return Mock.mock({
            "activeFilters": {
                "task|1-5": ["@string"],
                "size": ["@datasetSize"],
                "other|1-5": ["@string"],
                "language": ["@string"],
            },
            options: {
                lastModified: "@timeInteger",
                name: post.body,
                author: "@first @last",
                downloads: "@natural(0,100000)",
                id: "@string",
                type: "dataset"
            },
        })
    }
)

export const createRandomModelDetailData = Mock.mock("/api/modelDetail",
    "post", function (post) {
        let last = Random.last();
        let author = Random.first() + ' ' + last;
        return Mock.mock({
            "activeFilters": {
                "task|1-5": ["@string"],
                "library|1-5": ["@string"],
                "dataset|1-5": ["@string"],
                "other|1-5": ["@string"],
                "language": ["@string"],
            },
            options: {
                lastModified: "@timeInteger",
                lastModifiedInformation: "@lastModifiedInformation",
                name: post.body,
                author,
                avatar: Random.dataImage('100x100', last),
                downloads: "@natural(0,100000)",
                id: "@string",
                type: "model"
            },
        })
    }
)

// /api/modelDetail
export const createRandomFilesTable = Mock.mock("/api/filesTable",
    "post", function () {
        let folderArr = Mock.mock({
            "filesTable|1-3": [{
                key: "@string",
                fileName: "@filename",
                isAFolder: true,
                lastModified: "@timeInteger",
                lastModifiedInformation: "@lastModifiedInformation",
                size: undefined,
                fileURL: undefined
            }]
        })
        let fileArr = Mock.mock({
            "filesTable|4-10": [{
                key: "@string",
                fileName: "@fileNameWithType",
                isAFolder: false,
                lastModified: "@timeInteger",
                lastModifiedInformation: "@lastModifiedInformation",
                size: "@fileSize",
                fileURL: "@image(200x200)"
            }]
        })

        return {
            filesTable: folderArr.filesTable.concat(fileArr.filesTable)
        }
    }
)

export const getLoginStatus = Mock.mock("/api/login",
    "post", function () {
        return Mock.mock({
            personalInformation: "@personalInformation",
            loginStatus: "@loginInformation",
        }
            // {
            // loggedIn: "@boolean",
            // loginInformation: 
        )
    }
)

export const getPersonalFiles = Mock.mock("/api/personalFiles",
    "post", function (userName) {
        let obj = Mock.mock({
            "list|5-12": [{
                lastModified: "@timeInteger",
                name: "@fileName",
                author: userName.body,
                downloads: "@natural(0,10000)",
                id: "@string",
                type: "@type"
            }],
        })
        obj.list.sort((a: any, b: any) => {
            return b.lastModified - a.lastModified
        })
        return obj;
    }
)

export const getTrendingList = Mock.mock("/api/trendingList",
    "post", function (userName) {
        let obj = Mock.mock({
            "list|5-12": [{
                lastModified: "@timeInteger",
                name: "@fileName",
                author: userName.body,
                downloads: "@natural(0,10000)",
                id: "@string",
                type: "@type"
            }],
        })
        obj.list.sort((a: any, b: any) => {
            if (b.lastModified === a.lastModified) {
                return a.type - b.type
            }
            return b.lastModified - a.lastModified
        })
        return obj;
    }
)

export const createItem = Mock.mock("/api/createItem",
    "post", function (postMessage) {

    }
)

//返回之前版本文件和最新文件相关信息
export const getPrevAndNewFile = Mock.mock("/api/getPrevAndNewFile",
    "post", function (postMessage) {
        let num1 = Random.integer(1, 3);
        let num2 = Random.integer(1, 2);
        let arr = [];
        for (let i = 0; i < num1; i++) {
            let fileType = Random.fileNameWithType();
            arr.push({
                prevData: Random.paragraphNewLine(),
                newData: Random.paragraphNewLine(),
                oldFileName: fileType,
                newFileName: fileType
            })
        }
        for (let i = 0; i < num2; i++) {
            arr.push({
                prevData: Random.paragraphNewLine(),
                newData: Random.paragraphNewLine(),
                oldFileName: Random.fileNameWithType(),
                newFileName: Random.fileNameWithType()
            })
        }
        return arr;
    }
)

export const getBlob = Mock.mock("/api/getBlob",
    "post", function (postMessage) {
        console.log(postMessage.body);
        let arr = postMessage.body.split('/');
        let fileNameArr = arr[arr.length - 1].split('.');
        let fileTpye = fileNameArr[fileNameArr.length - 1]
        let size = Random.fileSize();
        // let fileType = fileName.split('.')[1];
        // let displayable = size > 5000000000 ? false : true;
        let displayable = true;
        let displayFileData = displayable ? { displayable, displayData: Random.getSomeCode(fileTpye) } : { displayable };
        let fileObj = Mock.mock({
            // fileName: fileName,
            // id: "@string",
            lastModified: "@timeInteger",
            lastModifiedInformation: "@lastModifiedInformation",
            size,
            fileURL: "@image(200x200)",
            ...displayFileData
        })
        return fileObj;
    }
)