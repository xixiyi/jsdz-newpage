var _apiUrl = "http://vip.jisudz.com:8080/"
// _apiUrl = "http://localhost:8080/"
var comUrl = {
    login:{
        login:_apiUrl+"login",                                                      //登录
        regist:_apiUrl+"regist",                                                    //注册
        update_userinfo:_apiUrl+"updateUserinfo",                                   //完善公司信息
    },
    user:{
        insert_user:_apiUrl+"insertUser",                                           //添加员工
        select_user:_apiUrl+"selectUser",                                           //查询员工
        update_user:_apiUrl+"updateUser",                                           //查询员工
        select_accountmanager:_apiUrl+"selectAccountmanager",                       //查询推荐人
        insert_kehu:_apiUrl+"insertKehu",                                           //添加客户
        select_kehu:_apiUrl+"selectKehu",                                           //查询客户
    },
    product:{
        insert_series:_apiUrl+"insertSeries",                                       //添加品牌系列
        select_series:_apiUrl+"selectSeries",                                       //查询品牌系列
        update_series:_apiUrl+"updateSeries",                                       //更新品牌系列
        delete_series:_apiUrl+"deleteSeries",                                       //删除品牌系列
        insert_product:_apiUrl+"insertProduct",                                     //添加品牌系列
        select_product:_apiUrl+"selectProduct",                                     //查询品牌系列
        update_product:_apiUrl+"updateProduct",                                     //更新品牌系列
        delete_product:_apiUrl+"deleteProduct",                                     //删除品牌系列
    },
    mokuai: {
        insert: _apiUrl + "insertmokuai",
        select: _apiUrl + "selectmokuai",
        update: _apiUrl + "updatemokuai",
        delete: _apiUrl + "deletemokuai"
    }
}

export default{
    comUrl
}