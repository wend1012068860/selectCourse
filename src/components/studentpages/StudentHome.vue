<template>
    <div>

      <div class="student-top">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">
            &nbsp;
          </div></el-col>

          <el-col :span="8"><div class="grid-content bg-purple-light">
            <h1>选&nbsp;&nbsp;课&nbsp;&nbsp;界&nbsp;&nbsp;面</h1>
            <p>选课起止时间:{{beginTime}}--{{endTime}}</p>
          </div></el-col>

          <el-col :span="8">
            <div class="grid-content bg-purple" style="float: right; margin-right: 2%; margin-top: 2%">
            <p>学号：{{loginStudent.loginAccount}}</p>
            <div>
              <el-dropdown  @command="handleCommand">
              <span class="el-dropdown-link">
                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">个人信息</el-dropdown-item>
                  <el-dropdown-item command="b">修改密码</el-dropdown-item>
                  <el-dropdown-item command="c">选课情况</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <p @click="exit">退出登录</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="student-bottom">
        <el-table
          :data="tableData"
          border>
          <el-table-column
            fixed
            prop="courseName"
            label="课程名称">
          </el-table-column>
          <el-table-column
            prop="courseNature"
            label="课程性质">
          </el-table-column>
          <el-table-column
            prop="coursePoint"
            label="学分">
          </el-table-column>
          <el-table-column
            prop="courseTeacher"
            label="授课老师">
          </el-table-column>
          <el-table-column
            prop="courseLimitNum"
            label="限选人数">
          </el-table-column>
          <el-table-column
            prop="courseChooseNum"
            label="已选人数">
          </el-table-column>
          <el-table-column
            prop="courseTp"
            label="时间地点">
          </el-table-column>
          <el-table-column
            label="操作"
            width="50px">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog title="个人信息" :visible.sync="dialogFormVisible1">
        <el-form :model="form">
          <el-form-item label="学号" :label-width="formLabelWidth">
            <el-input v-model="form.studentNumber" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.studentName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-input v-model="form.studentClass" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth">
            <el-input v-model="form.studentProfession" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="学院" :label-width="formLabelWidth">
            <el-input v-model="form.studentAcademy" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="入学时间" :label-width="formLabelWidth">
            <el-input v-model="form.studentInTime" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.studentContact" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改密码" :visible.sync="dialogFormVisible2" style="width: 50%; margin: 0 auto">
        <el-form :model="form2">
          <el-form-item label="原密码" prop="oldPass">
            <el-input type="password" v-model="form2.oldPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="form2.pass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changePass">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="已选课程" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="courseName" label="课程名称" ></el-table-column>
          <el-table-column property="courseNature" label="课程性质" ></el-table-column>
          <el-table-column property="coursePoint" label="学分"></el-table-column>
          <el-table-column property="courseTeacher" label="授课老师"></el-table-column>
          <el-table-column property="courseLimitNum" label="限选人数"></el-table-column>
          <el-table-column property="courseChooseNum" label="已选人数"></el-table-column>
          <el-table-column property="courseTp" label="时间地点"></el-table-column>
          <el-table-column
            label="操作"
            width="50px">
            <template slot-scope="scope">
              <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">退选</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>



    </div>
</template>

<script>

    export default {
        data(){
          return{
            loginStudent: JSON.parse(localStorage.getItem('loginUser')),
            beginTime: "",
            endTime: "",
            tableData: [],
            searchStudent:[],
            dialogTableVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            form: {
              studentNumber: '',
              studentName: '',
              studentClass: '',
              studentProfession: '',
              studentAcademy: '',
              studentInTime: '',
              studentContact: ''
            },
            form2: {
              oldPass: '',
              pass: '',
            },
            formLabelWidth: '120px',
            gridData: [],
          };
        },
      methods: {

        changePass(){
          var params = new URLSearchParams();
          params.append('loginAccount',this.loginStudent.loginAccount);
          params.append('oldPass',this.form2.oldPass);
          params.append('newPass',this.form2.pass);
          this.$http
            .post('http://localhost:8080/login/change',params)
            .then(function (response) {
              if (response.data.data.data === 1){
                alert("修改成功!")
              } else {
                alert("原密码错误，修改失败!")
              }
            });

          this.dialogFormVisible2 = false;
        },

        exit(){
          var that = this;
          that.$router.push("/")
        },

        handleDelete(index, row){
          console.log(row.courseId);
          var params = new URLSearchParams();
          params.append('courseId',row.courseId);
          params.append('studentNumber',this.loginStudent.loginAccount);
          this.$http
            .post('http://localhost:8080/course/exitRace',params)
            .then(function (response) {
              if (response.data.data === 1){
                alert("退选成功！")
              } else {
                alert("退选失败！")
              }
            });
          this.gridData.splice(index,1);
        },

        handleClick(row) {
          console.log(row);
          var params = new URLSearchParams();
          params.append('courseId',row.courseId);
          params.append('teacherName',row.courseTeacher);
          params.append('studentNumber',this.loginStudent.loginAccount);
          this.$http
            .post('http://localhost:8080/course/choose',params)
            .then(function (response) {
              alert(response.data.data)
            });
        },
        handleCommand(command) {
          if (command === "a") {
            this.dialogFormVisible1  = true;
          }
          if (command === "b") {
            this.dialogFormVisible2  = true;
          }
          if (command === "c") {
            this.dialogTableVisible  = true;
          }

        }
      },
      created() {
        var that = this;
        this.$http
          .get('http://localhost:8080/course/studentCourse')
          .then(function (response) {
            that.tableData = response.data.data.data;
          });
        var params = new URLSearchParams();
        params.append('studentNumber',this.loginStudent.loginAccount);
        this.$http
          .post('http://localhost:8080/student/searchOne',params)
          .then(function (response) {
            that.searchStudent = response.data.data.data;
            console.log(that.searchStudent);
            that.form.studentNumber = that.searchStudent.studentNumber;
            that.form.studentName = that.searchStudent.studentName;
            that.form.studentClass = that.searchStudent.studentClass;
            that.form.studentProfession = that.searchStudent.studentProfession;
            that.form.studentAcademy = that.searchStudent.studentAcademy;
            that.form.studentInTime = that.searchStudent.studentInTime;
            that.form.studentContact = that.searchStudent.studentContact;
          });
        var params = new URLSearchParams();
        params.append('studentNumber',this.loginStudent.loginAccount);
        this.$http
          .post('http://localhost:8080/course/chooseCourse',params)
          .then(function (response) {
            that.gridData = response.data.data.data;
          });
        this.$http
          .get('http://localhost:8080/course/time')
          .then(function (response) {
            that.beginTime = response.data.data[0];
            that.endTime = response.data.data[1];
          })
      },
  }
</script>

<style scoped>
.student-top{
  background: darkkhaki;
  /*margin-top: -1%;*/
  width: 100%;
}
  .student-bottom{
    width: 80%;
    margin: 0 auto;
  }
.el-dropdown-link {
  cursor: pointer;
  color: black;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
