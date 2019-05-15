<template>
    <div>

      <div class="teacher-top">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">
            &nbsp;
          </div></el-col>

          <el-col :span="8"><div class="grid-content bg-purple-light">
            <h1>选&nbsp;&nbsp;课&nbsp;&nbsp;情&nbsp;&nbsp;况</h1>
          </div></el-col>

          <el-col :span="8"><div class="grid-content bg-purple" style="float: right; margin-right: 2%; margin-top: 4%">
            <p>教师编号：{{loginTeacher.loginAccount}}</p>
            <div>
              <el-dropdown  @command="handleCommand">
              <span class="el-dropdown-link">
                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">个人信息</el-dropdown-item>
                  <el-dropdown-item command="b">修改密码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <p @click="exit">退出登录</p>
          </div></el-col>
        </el-row>
      </div>

      <div class="teacher-bottom">
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
            width="100px">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看选课学生</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog title="个人信息" :visible.sync="dialogFormVisible1">
        <el-form :model="form">
          <el-form-item label="教师编号" :label-width="formLabelWidth">
            <el-input v-model="form.teacherNumber" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.teacherName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="学院" :label-width="formLabelWidth">
            <el-input v-model="form.teacherAcademy" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.teacherContact" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changePass">确 定</el-button>
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

      <el-dialog title="选此课程的学生" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="studentNumber" label="学号" ></el-table-column>
          <el-table-column property="studentName" label="姓名" ></el-table-column>
          <el-table-column property="studentClass" label="班级"></el-table-column>
          <el-table-column property="studentProfession" label="专业"></el-table-column>
          <el-table-column property="studentAcademy" label="学院"></el-table-column>
          <el-table-column property="studentInTime" label="入学时间"></el-table-column>
          <el-table-column property="studentContact" label="联系方式"></el-table-column>
        </el-table>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        data(){
          return{
            loginTeacher: JSON.parse(localStorage.getItem('loginUser')),
            tableData: [],
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogTableVisible: false,
            form: {
              teacherNumber: '',
              teacherName: '',
              teacherAcademy: '',
              teacherContact: ''
            },
            form2: {
              oldPass: '',
              pass: ''
            },
            gridData:[],
            formLabelWidth: '120px',
          }
        },
      methods: {

        exit(){
          var that = this;
          that.$router.push("/")
        },

        changePass(){
          var params = new URLSearchParams();
          params.append('loginAccount',this.loginTeacher.loginAccount);
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

        handleClick(row) {
          console.log(row.courseId);
          this.dialogTableVisible = true;
        },
        handleCommand(command) {
          if (command === "a") {
            this.dialogFormVisible1  = true;
          }
          if (command === "b") {
            this.dialogFormVisible2  = true;
          }

        }
      },
      created() {
        var that = this;
        var params = new URLSearchParams();
        params.append('teacherNumber',this.loginTeacher.loginAccount);
        this.$http
          .post('http://localhost:8080/teacher/searchOne',params)
          .then(function (response) {
            that.form.teacherNumber = response.data.data.data.teacherNumber;
            that.form.teacherName = response.data.data.data.teacherName;
            that.form.teacherAcademy = response.data.data.data.teacherAcademy;
            that.form.teacherContact = response.data.data.data.teacherContact;
          });
        var params = new URLSearchParams();
        params.append('teacherNumber',this.loginTeacher.loginAccount);
        this.$http
          .post('http://localhost:8080/course/teacher',params)
          .then(function (response) {
            that.tableData = response.data.data;
          });
      }
    }
</script>

<style scoped>
  .teacher-top{
    background: darkkhaki;
  }
  .teacher-bottom{
    width: 80%;
    margin: 0 auto;
  }
</style>
