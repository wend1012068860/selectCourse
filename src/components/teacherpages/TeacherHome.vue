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
            <p>姓名：{{teacherName}}</p>
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
          <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改密码" :visible.sync="dialogFormVisible2" style="width: 50%; margin: 0 auto">
        <el-form :model="form2">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="form2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form2.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        data(){
          return{
            teacherName: '测试老师',
            tableData: [{"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
              "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
              "courseTp": "星期二(1-2节)/教一楼102"},
              {"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
                "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
                "courseTp": "星期二(1-2节)/教一楼102"},
              ],
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            form: {
              teacherNumber: '3333',
              teacherName: '教师M',
              teacherAcademy: '计算机与软件学院',
              teacherContact: '18052073669'
            },
            form2: {
              pass: '',
              checkPass: ''
            },
            formLabelWidth: '120px',
          }
        },
      methods: {
        handleClick(row) {
          console.log(row);
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
