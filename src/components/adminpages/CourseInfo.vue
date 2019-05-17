<template>
    <div>
      <div>
        <el-table
          :data="courses.filter(data => !search ||
          data.courseName.toLowerCase().includes(search.toLowerCase()) ||
          data.courseTeacher.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%;"
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
            label="时间地点"
            prop="courseTp">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="搜索课程"/>
            </template>
            <template slot-scope="scope">
              <!--<el-button-->
              <!--size="mini"-->
              <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>


      <div class="two-time">
        <div class="block" style="float: left">
          <span class="demonstration">&nbsp;&nbsp;&nbsp;&nbsp;选择选课起止时间</span>
          <el-date-picker
            v-model="startAndEndTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </div>
          <el-button type="success" style="float: right" @click="getSETime">确认发布</el-button>
      </div>
      <div>
        <p>&nbsp;</p>
      </div>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        courses: [],
        search: '',
        startAndEndTime: '',
      }
    },
    methods: {
      getSETime(){
        var params = new URLSearchParams();
        params.append('setime',this.startAndEndTime);
        this.$http
          .post('http://localhost:8080/course/setime',params)
          .then(function (response) {
            alert("发布成功！")
          })
      },
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
.two-time{
  margin-top: 20px;
  font-size: 20px;
  float: left;
  width: 100%;
}
</style>
