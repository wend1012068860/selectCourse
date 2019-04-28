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

          <el-col :span="8"><div class="grid-content bg-purple" style="float: right; margin-right: 2%; margin-top: 4%">
            <p>姓名：{{studentName}}</p>
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
          </div></el-col>
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
              <el-button @click="handleClick(scope.row)" type="text" size="small">退选</el-button>
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
            studentName: "测试学生",
            beginTime: "2019-04-22 12:00:00",
            endTime: "2019-4-25 12:00:00",
            tableData: [{"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
              "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
            "courseTp": "星期二(1-2节)/教一楼102"},
              {"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
                "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
                "courseTp": "星期二(1-2节)/教一楼102"},
              {"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
                "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
                "courseTp": "星期二(1-2节)/教一楼102"},
              {"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
                "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
                "courseTp": "星期二(1-2节)/教一楼102"},
              {"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
                "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
                "courseTp": "星期二(1-2节)/教一楼102"},
              {"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
                "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
                "courseTp": "星期二(1-2节)/教一楼102"},
              {"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
                "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
                "courseTp": "星期二(1-2节)/教一楼102"},
              {"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
                "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
                "courseTp": "星期二(1-2节)/教一楼102"},
              {"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
                "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
                "courseTp": "星期二(1-2节)/教一楼102"},
              {"courseName":"测试课程","courseNature":"公共课","coursePoint": 2,
                "courseTeacher": "教师test","courseLimitNum":200,"courseChooseNum":98,
                "courseTp": "星期二(1-2节)/教一楼102"}],
            dialogTableVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            form: {
              studentNumber: '3333',
              studentName: '测试学生',
              studentClass: '软件1611',
              studentProfession: '软件技术',
              studentAcademy: '计算机与软件学院',
              studentInTime: '2016年9月',
              studentContact: '18052073669'
            },
            form2: {
              pass: '',
              checkPass: ''
            },
            formLabelWidth: '120px',
            gridData: [{
              courseName: '测试课程',
              courseNature: '公共课',
              coursePoint: 2,
              courseTeacher: '教师M',
              courseLimitNum: 200,
              courseChooseNum: 165,
              courseTp: "星期一(1-2节)/教一楼103"
            }],
          };
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
          if (command === "c") {
            this.dialogTableVisible  = true;
          }

        }
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
