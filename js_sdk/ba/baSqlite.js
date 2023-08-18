// 原生sqlite本地数据库管理 Ba-Sqlite
// https://ext.dcloud.net.cn/plugin?id=9402

// #ifdef APP-PLUS
const sqlite = uni.requireNativePlugin('Ba-Sqlite');

import helper from '@/js_sdk/helper.js'
// #endif

const baSqlite = {
    data: {
        dbName: 'ba-db.db', // 数据库名称
        // dbPath:'', // 自定义数据库路径，不传为默认路径（传值为应用可访问的手机本地路径）
        tableName: 'user', // 表名
        // columnNames：表结构
        // name	String	''	字段名称
        // type	String	''	字段类型（text、int）
        // isId	Boolean	false	是否是主键（默认主键'_id'）
        // isAuto	Boolean	false	是否自增（仅主键）
        // notNull	Boolean	false	是否不能为空
        // desc 字段描述
        columnNames: [], // "[{name: '...',type: 'int',isId: true,desc:'性别1:男 2:女 0:未知'}, ...]", // 
        // 需要插入的数据 Array（json），如 [{_id: 1,name: '张三',sex: '1'}]
        values: [],
        deleteIdKey: '_id',
        deleteId: '1',
        updateQueryKey: 'sex = ?',
        updateQueryValue: "['2']",
        updateContent: "{hobby: '逛街'}",
        pageNum: 1,
        pageSize: 10,
        orderKey: "sex",
        orderType: "desc",
        dataResult: ""
    },
    config(obj) {
        this.data = {
            ...this.data,
            ...obj
        }
    },
    openOrCreate() { //打开或创建数据库（也可以用来切换多个数据库）
        sqlite.openOrCreate({
                'dbName': this.data.dbName,
                //'dbPath': '/storage/emulated/0',//自定义数据库路径
            },
            (res) => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    isHasDb() { //查询某个数据库是否存在
        sqlite.isHasDb({
                'dbName': this.data.dbName,
            },
            (res) => {
                console.log(res);
                let msg = res.msg;
                if (res.ok) {
                    msg = res.isHasDb ? "存在" : "不存在";
                }
                uni.showToast({
                    title: msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    createTable() { //创建表
        sqlite.createTable({
                'tableName': this.data.tableName,
                'columnNames': this.data.columnNames,
            },
            (res) => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    deleteTable() { //删除表
        sqlite.deleteTable({
                'tableName': this.data.tableName,
            },
            (res) => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    isHasTable() { //查询某个表是否存在
        sqlite.isHasTable({
                'tableName': this.data.tableName,
            },
            (res) => {
                console.log(res);
                let msg = res.msg;
                if (res.ok) {
                    msg = res.isHasTable ? "存在" : "不存在";
                }
                uni.showToast({
                    title: msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    getTables() { //获取数据库所有表
        sqlite.getTables({},
            (res) => {
                console.log(res);

                this.data.dataResult = res.ok ? JSON.stringify(res) : '';

                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    insert() { //插入数据
        sqlite.insert({
                'tableName': this.data.tableName,
                'values': this.data.values,
            },
            (res) => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    replace() { //更新数据
        sqlite.replace({
                'tableName': this.data.tableName,
                'values': this.data.values,
            },
            (res) => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    update() { //批量修改数据
        sqlite.update({
                'tableName': this.data.tableName,
                'tableName': this.data.tableName,
                'selection': this.data.updateQueryKey,
                'selectionArgs': this.data.updateQueryValue,
                'values': this.data.updateContent,
            },
            (res) => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    deleteData() { //删除数据
        sqlite.delete({
                'tableName': this.data.tableName,
                'idKey': this.data.deleteIdKey,
                'idValue': this.data.deleteId,
            },
            (res) => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    clearData() { //清空数据
        sqlite.clear({
                'tableName': this.data.tableName,
            },
            (res) => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    query() { //查询数据
        let orderBy;
        if (this.data.orderKey && this.data.orderType) {
            orderBy = this.data.orderKey + " " + this.data.orderType;
        }
        sqlite.query({
                'tableName': this.data.tableName,
                'orderBy': orderBy,
            },
            (res) => {
                console.log(res);
                this.data.dataResult = res.ok ? JSON.stringify(res) : '';

                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    queryPage() { //分页查询
        let orderBy;
        if (this.data.orderKey && this.data.orderType) {
            orderBy = this.data.orderKey + " " + this.data.orderType;
        }
        sqlite.queryPage({
                'tableName': this.data.tableName,
                'pageNum': this.data.pageNum,
                'pageSize': this.data.pageSize,
                'orderBy': orderBy,
            },
            (res) => {
                console.log(res);

                this.data.dataResult = res.ok ? JSON.stringify(res) : '';

                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
    closeDb() { //关闭数据库
        sqlite.closeDb({},
            (res) => {
                console.log(res);
                uni.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 3000
                })
            });
    },
}
export default baSqlite