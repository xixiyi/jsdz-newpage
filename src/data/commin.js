var _apiUrl = "http://www.jisudz.com/jbg/"
localStorage.projectPath = "jbg"
_apiUrl = "http://localhost/shhs/"
var comUrl = {
    login: {
        login: _apiUrl + "login.do",                                                   //登录
        regist: _apiUrl + "adduser.do",                                                //注册
        update_userinfo: _apiUrl + "updateUserinfo",                                   //完善公司信息
    },
    user: {
        insert_user: _apiUrl + "adminadduser.do",                                      //添加员工
        select_user: _apiUrl + "selectsuoyouStudent.do",                               //查询员工
        update_user: _apiUrl + "updateUser",                                           //更新员工
        update_userLeftnav: _apiUrl + "updateuserleftnav.do",
        delete_user: _apiUrl + "deletewenyuan.do",                                     //删除员工
        select_accountmanager: _apiUrl + "selectaccountmanager.do",                    //查询推荐人
        insert_kehu: _apiUrl + "tianjiauser.do",                                       //添加客户
        delete_kehu: _apiUrl + "updateuserinstatus.do",                                   //删除客户
        select_kehu: _apiUrl + "selectAlluser.do",                                     //查询客户
        update_kehu: _apiUrl + "updateuserinformation.do",                                //更新客户
    },
    purchase: {
        select_father_purchase: _apiUrl + "selectfatherpurchase.do",                      //查询采购组订单
        select_son_purchase: _apiUrl + "selectsonpurchase.do",
        insert_purchase: _apiUrl + "insertpurchase.do",
    },
    garde: {
        select_garde: _apiUrl + "selectallgrade.do"                                       //查询等级
    },
    product: {
        insert_series: _apiUrl + "insertseries.do",                                       //添加品牌系列
        select_series: _apiUrl + "selectseries.do",                                       //查询品牌系列
        update_series: _apiUrl + "updateseriess.do",                                       //更新品牌系列
        delete_series: _apiUrl + "deleteSeries",                                       //删除品牌系列
        insert_product: _apiUrl + "insertproductinformation.do",                                     //添加型号
        select_product: _apiUrl + "selectproductnumbyseriesid.do",                                     //查询型号
        yincang_product: _apiUrl + "updateproductnuminvenzhi.do",                                     //隐藏型号
        update_product: _apiUrl + "updateproductnuminvenzhi.do",
        delete_product: _apiUrl + "deleteProduct",                                     //删除品牌系列
    },
    productInven: {
        select_productinven: _apiUrl + "selectproductallinven.do",                         //查询所有库存地
        select_productnum: _apiUrl + "selectorderproductnum.do",
        select_picibyproductnum: _apiUrl + "selectinvenpici.do",
        selectallproductinven: _apiUrl + "selectallproductinven.do",
        insertinven: _apiUrl + "insertinven.do"
    },
    productPrice: {
        select_price_kcidAnduid:_apiUrl+"selectpriceBykcidanduid.do"
    },
    firm: {
        insert: _apiUrl + "insertfirm.do",
        select: _apiUrl + "selectfirm.do",
        delete: _apiUrl + "deletefirm.do"
    },
    mokuai: {
        insert: _apiUrl + "insertmokuai.do",
        select: _apiUrl + "selectmokuai.do",
        update: _apiUrl + "updatemokuai.do",
        delete: _apiUrl + "deletemokuai.do"
    }
}

export default {
    comUrl
}