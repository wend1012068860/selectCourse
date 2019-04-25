<template>
    <div class="courseAdd">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="ruleForm.courseName"></el-input>
        </el-form-item>

        <el-form-item label="课程性质" prop="courseNature">
          <el-radio-group v-model="ruleForm.courseNature">
            <el-radio label="公共课"></el-radio>
            <el-radio label="限选课"></el-radio>
            <el-radio label="线上课"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="课程学分" prop="coursePoint">
          <el-radio-group v-model="ruleForm.coursePoint">
            <el-radio label="1"></el-radio>
            <el-radio label="2"></el-radio>
            <el-radio label="3"></el-radio>
            <el-radio label="4"></el-radio>
            <el-radio label="5"></el-radio>
            <el-radio label="6"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="授课老师" prop="courseTeacher">
          <el-input v-model="ruleForm.courseTeacher"></el-input>
        </el-form-item>

        <el-form-item label="限选人数" prop="courseLimitNum">
          <el-input v-model="ruleForm.courseLimitNum"></el-input>
        </el-form-item>

        <el-form-item label="上课时间" prop="courseTime">
          <el-select v-model="ruleForm.courseTime" placeholder="请选择上课时间">
            <el-option label="星期一(1-2节)" value="星期一(1-2节)"></el-option>
            <el-option label="星期一(3-4节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期一(5-6节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期一(7-8节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期一(9-10节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期二(1-2节)" value="星期一(1-2节)"></el-option>
            <el-option label="星期二(3-4节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期二(5-6节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期二(7-8节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期二(9-10节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期三(1-2节)" value="星期一(1-2节)"></el-option>
            <el-option label="星期三(3-4节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期三(5-6节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期三(7-8节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期三(9-10节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期四(1-2节)" value="星期一(1-2节)"></el-option>
            <el-option label="星期四(3-4节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期四(5-6节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期四(7-8节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期四(9-10节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期五(1-2节)" value="星期一(1-2节)"></el-option>
            <el-option label="星期五(3-4节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期五(5-6节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期五(7-8节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期五(9-10节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期六(1-2节)" value="星期一(1-2节)"></el-option>
            <el-option label="星期六(3-4节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期六(5-6节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期六(7-8节)" value="星期一(3-4节]"></el-option>
            <el-option label="星期六(9-10节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期日(1-2节)" value="星期一(1-2节)"></el-option>
            <el-option label="星期日(3-4节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期日(5-6节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期日(7-8节)" value="星期一(3-4节)"></el-option>
            <el-option label="星期日(9-10节)" value="星期一(3-4节)"></el-option>
          </el-select>
          <el-button type="info" @click="searchPlace">查询此时间空余教室/地点</el-button>
        </el-form-item>

        <el-form-item label="上课地点" prop="coursePlace">
        <el-select v-model="ruleForm.coursePlace" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.roomId"
            :label="item.room"
            :value="item.room">
          </el-option>
        </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
</template>

<script>
    export default {
      data() {
        return {
          ruleForm: {
            courseName: '',
            courseNature: '',
            coursePoint: '',
            courseTeacher: '',
            courseLimitNum: '',
            courseChooseNum: 0,
            courseTime: '',
            coursePlace: ''
          },
          rules: {
            courseName: [
              { required: true, message: '请输入课程名称', trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ],
            courseNature: [
              { required: true, message: '请选择课程性质', trigger: 'change' }
            ],
            coursePoint: [
              { required: true, message: '请选择课程学分', trigger: 'change' }
            ],
            courseTeacher: [
              { required: true, message: '请输入教师姓名', trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ],
            courseLimitNum: [
              { required: true, message: '请输入限选人数', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            courseTime: [
              { required: true, message: '请选择上课时间', trigger: 'change' }
            ],
            coursePlace: [
              { required: true, message: '请输入限选人数', trigger: 'blur' },
            ],
          },
          options: [],
        };
      },
      methods: {
        searchPlace(){
          // if(this.ruleForm.courseLimitNum === null || this.ruleForm.courseTime === null){
          //   alert("限选人数和上课时间不能为空!")
          // }
          var that = this;
          var params = new URLSearchParams();
          params.append('time',this.ruleForm.courseTime);
          params.append('courseLimitNum',this.ruleForm.courseLimitNum);
          this.$http
            .post('http://localhost:8080/room/freeRoom',params)
            .then(function (response) {

            that.options = response.data.data.data;
              console.log(options);
            });

        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {

              var that = this;
              this.$http.post('http://localhost:8080/course/save',{"courseName":this.ruleForm.courseName,
              "courseNature":this.ruleForm.courseNature, "coursePoint":parseInt(this.ruleForm.coursePoint),
              "courseTeacher":this.ruleForm.courseTeacher, "courseLimitNum":parseInt(this.ruleForm.courseLimitNum),
              "courseChooseNum":this.ruleForm.courseChooseNum, "courseTp": this.ruleForm.courseTime + "/"
                  + this.ruleForm.coursePlace})
                .then(function (response) {
                  alert('submit!');
                })

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
  .courseAdd{
    width: 80%;
    margin: 1% auto;
  }
</style>
