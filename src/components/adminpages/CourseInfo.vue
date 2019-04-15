<template>
    <div>
      <el-table
        :data="courses.filter(data => !search || data.courseName.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="课程名称"
          prop="courseName">
        </el-table-column>
        <el-table-column
          label="课程性质"
          prop="courseNature">
        </el-table-column>
        <el-table-column
          label="学分"
          prop="coursePoint">
        </el-table-column>
        <el-table-column
          label="教师"
          prop="courseTeacher">
        </el-table-column>
        <el-table-column
          label="限选人数"
          prop="courseLimitNum">
        </el-table-column>
        <el-table-column
          label="已选人数"
          prop="courseChooseNum">
        </el-table-column>
        <el-table-column
          label="开始时间"
          prop="beginTime">
        </el-table-column>
        <el-table-column
          label="结束时间"
          prop="endTime">
        </el-table-column>
        <el-table-column
          label="时间地点"
          prop="courseTp">
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
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="deleteRow(scope.$index, courses)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        courses: [],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      deleteRow(index, rows) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          rows.splice(index, 1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
    created() {
      var that = this;
      this.$http
        .get('http://localhost:8080/course/all')
        .then(function (response) {
          that.courses = response.data.data.data;
        })
    },
  }
</script>

<style scoped>

</style>
