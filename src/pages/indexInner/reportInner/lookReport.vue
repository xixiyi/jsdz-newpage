<template>
  <div>
    <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column
      fixed
      prop="date"
      label="序号"
      width="150">
    </el-table-column>
 <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容"
      width="500"
      >
      <el-input  @input="showkuangHandler"></el-input>
    </el-table-column>
   
    <el-table-column
      prop="zip"
      label="操作人"
      width="120">
    </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     -->
  </div>



</template>

<script>
export default {
    data(){
         return {
        // tableData: [{
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄'
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄'
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄'
        // }]
         }
    },
      methods: {
      // handleEdit(index, row) {
      //   console.log(index, row);
      // },
      // handleDelete(index, row) {
      //   console.log(index, row);
      // },
      // showkuangHandler(){
      //     console.log("lal")
      // }
    }
};
</script>

<style scoped>
</style>
