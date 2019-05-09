<template>
    <div>
      <el-table
        :data="tableData.filter(data => !search || data.teacherNumber.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="教师编号"
          prop="teacherNumber">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="teacherName">
        </el-table-column>
        <el-table-column
          label="学院"
          prop="teacherAcademy">
        </el-table-column>
        <el-table-column
          label="联系方式"
          prop="teacherContact">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="daoChu">
        <el-button type="success" round style="float: right">导出教师信息</el-button>
      </div>
      <div class="daoChu">
        <el-button type="warning" round style="float: right">导入教师信息</el-button>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created() {
      var that = this;
      this.$http
        .get('http://localhost:8080/teacher/all')
        .then(function (response) {
          that.tableData = response.data.data.data;
        })
    },
  }
</script>

<style scoped>
  .daoChu{
    margin-top: 20px;
  }
</style>
