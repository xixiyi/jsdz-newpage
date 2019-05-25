<template>
  <div>
    <div>
      <el-button type="primary" size="mini" round @click="openInsertDiv">添加模块</el-button>
    </div>
    <el-table :data="mokuaiData" style="width: 100%" :height="tabHeight">
      <!-- <el-table-column prop="id" label="序号" width="150"></el-table-column> -->
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="mokuainame" label="模块名" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- @click.native.prevent="deleteRow(scope.$index, mokuaiData)" -->
          <el-button @click="openDeleteDiv(scope.$index, mokuaiData)" type="text" size="small">删除模块</el-button>
          <el-button
            @click.native.prevent="updateTreeManager(scope.$index, mokuaiData,1)"
            type="text"
            size="small"
          >分配菜单</el-button>
          <el-button
            @click.native.prevent="updateTreeManager(scope.$index, mokuaiData,2)"
            type="text"
            size="small"
          >分配按钮</el-button>
          <el-button
            @click.native.prevent="updateTreeManager(scope.$index, mokuaiData,3)"
            type="text"
            size="small"
          >显示内容</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 50, 100, 200,total]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog :title="treeTitle" :visible.sync="treeVisible">
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="class"
        ref="treeManger"
        :props="defaultProps"
        :accordion="treeAccordion"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeVisible = false">取 消</el-button>
        <el-button type="primary" @click="getTreeKey">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mokuaiData: [],
      treeData: [],
      treeTitle: "",
      menuData: [],
      tabHeight: "",
      currentPage4: 1,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      updateMokuaiId: 0,
      updateTreeType: 0,
      treeVisible: false,
      treeAccordion: true,
      defaultProps: {
        label: "title",
        children: "children"
      }
    };
  },
  mounted() {
    console.log(this.navMenu);
    var menuTitle = this.navMenu.menuTitle;
    var menuData = this.navMenu.menuData;
    var menuArr = [];
    var j = 0;
    for (var i = 0; i < menuTitle.length; i++) {
      var parentObj = {};
      parentObj.id = menuTitle[i].id;
      parentObj.title = menuTitle[i].title;
      parentObj.class = menuTitle[i].class;
      parentObj.children = [];
      for (j; j < menuData.length; j++) {
        if (parentObj.id == menuData[j].id) {
          var childrenObj = {};
          childrenObj.id = menuData[j].id;
          childrenObj.title = menuData[j].title;
          childrenObj.class = menuData[j].class;
          parentObj.children.push(childrenObj);
        } else {
          break;
        }
      }
      menuArr.push(parentObj);
    }
    this.menuData = menuArr;
    console.log(this.commin);
    this.tabHeight =
      document.documentElement.clientHeight -
      53 -
      10 -
      41 -
      15 -
      10 -
      36 -
      28 +
      "px";
    this.selectMokuai({ pageNum: 1, pageSize: this.pageSize });
  },
  methods: {
    selectMokuai(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid
      this.axios
        .get(this.commin.comUrl.mokuai.select, {
          params: data
        })
        .then(function(response) {
          that.mokuaiData = response.data.data.list;
          that.total = response.data.data.total;
          that.treeVisible = false
        })
        .catch(function(error) {});
    },
    insertMokuai(data) {
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid
      this.axios
        .get(this.commin.comUrl.mokuai.insert, {
          params: data
        })
        .then(function(response) {
          var data = {};
          data.pageNum = 1;
          data.pageSize = that.pageSize;
          that.selectMokuai(data);
        })
        .catch(function(error) {});
    },
    deleteMokuai(index, rows) {
      
      var that = this;
      var data = {};
      data.dbid = JSON.parse(localStorage.user).dbid
      data.id = rows[index].id;
      this.axios
        .get(this.commin.comUrl.mokuai.delete, {
          params: data
        })
        .then(function(response) {
          var data = {};
          data.pageNum = 1;
          data.pageSize = that.pageSize;
          that.selectMokuai(data);
        })
        .catch(function(error) {});
    },
    updateMokuai(data){
      var that = this;
      data.dbid = JSON.parse(localStorage.user).dbid
      this.axios
        .get(this.commin.comUrl.mokuai.update, {
          params: data
        })
        .then(function(response) {
          var data = {};
          data.pageNum = that.pageNum;
          data.pageSize = that.pageSize;
          that.selectMokuai(data);
        })
        .catch(function(error) {});
    },
    openInsertDiv() {
      var that = this;
      this.$prompt("请输入模块名", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: "",
        inputErrorMessage: ""
      })
        .then(({ value }) => {
          var data = {};
          data.mokuainame = value;
          that.insertMokuai(data);
        })
        .catch(() => {});
    },
    openDeleteDiv(index, rows) {
      var that = this;
      this.$confirm("此操作将永久删除该模块, 是否继续?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.deleteMokuai(index, rows);
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.pageSize = val;
      var data = {};
      data.pageSize = val;
      data.pageNum = 1;
      this.selectMokuai(data);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNum = val;
      this.selectMokuai(data);
    },
    updateTreeManager(index, rows, type) {
      this.treeVisible = true;
      
      if (type == 1) {
        this.treeTitle = "分配菜单：" + rows[index].mokuainame
        this.treeData = this.menuData;
        console.log(rows[index].menuData)
        var arr = []
        var menuData = rows[index].menuData||""
        var getarr = menuData.split(",")
        for(var i=0;i<this.navMenu.menuTitle.length;i++){
          for(var j=0;j<getarr.length;j++){
            if(this.navMenu.menuTitle[i].class==getarr[j]){
              getarr.splice(j, 1);
            }
          }
        }
        this.$nextTick(function() {
          this.$refs.treeManger.setCheckedKeys(getarr)
        })
        console.log(getarr)
      } else if (type == 2) {
        this.treeData = [];
      } else if (type == 2) {
        this.treeData = [];
      }
      this.updateTreeType = type;
      
      this.updateMokuaiId = rows[index].id;
      console.log(this.updateMokuaiId);
      console.log(rows);
      console.log(index);
    },
    getTreeKey() {
      var checkTreeData = this.$refs.treeManger.getCheckedKeys();
      var checkTreeDataStr = checkTreeData.join(",");
      var data = {}
      data.id = this.updateMokuaiId
      if (this.updateTreeType == 1) {
        for (var i = 0; i < this.navMenu.menuTitle.length; i++) {
          if (checkTreeDataStr.indexOf(this.navMenu.menuTitle[i].class) != -1) {
            checkTreeData.push(this.navMenu.menuTitle[i].class);
          }
        }
      }
      var set = new Set(checkTreeData);
      checkTreeData = Array.from(set);
      console.log(checkTreeData);
      if(this.updateTreeType==1){
        data.menuData = checkTreeData.join(",")
      }else if(this.updateTreeType==2){
        return
      }else if(this.updateTreeType==3){
        return
      }
      this.updateMokuai(data)
    }
  }
};
</script>

