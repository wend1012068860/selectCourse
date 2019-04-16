<template>
    <div>
      <el-table
        :data="courses.filter(data => !search || data.courseName.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        @row-click="getRowDetails">
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
              @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
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
        search: '',
      }
    },
    methods: {
      getRowDetails(row){
        //alert(row.courseId);
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      deleteRow(index,row) {
        var params = new URLSearchParams();
        params.append('courseId',row.courseId);
        this.$http
          .post('http://localhost:8080/course/deleteOne',params)
          .then(function (response) {
            //alert(response.data.data)
          });
        this.courses.splice(index,1);

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
