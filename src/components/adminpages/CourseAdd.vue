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
          <el-select v-model="ruleForm.coursePoint" placeholder="请选择课程学分">
            <el-option label="1分" value="1"></el-option>
            <el-option label="2分" value="2"></el-option>
            <el-option label="3分" value="3"></el-option>
            <el-option label="4分" value="4"></el-option>
            <el-option label="5分" value="5"></el-option>
            <el-option label="6分" value="6"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="授课老师" prop="courseTeacher">
          <el-input v-model="ruleForm.courseTeacher"></el-input>
        </el-form-item>

        <el-form-item label="限选人数" prop="courseLimitNum">
          <el-input v-model="ruleForm.courseLimitNum"></el-input>
        </el-form-item>

        <el-form-item label="开选时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="结束时间" required>
          <el-col :span="11">
            <el-form-item prop="date3">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date3" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date4">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date4" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="时间地点" prop="courseTp">
          <div class="block">
            <el-cascader
              :options="options"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </div>
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
            coursePoint: '',
            date1: '',
            date2: '',
            date3: '',
            date4: '',
            courseTeacher: '',
            courseLimitNum: '',
            courseChooseNum: 0,
            courseNature: '',
            courseTp: ''
          },
          rules: {
            courseName: [
              { required: true, message: '请输入课程名称', trigger: 'blur' },
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
            coursePoint: [
              { required: true, message: '请选择课程学分', trigger: 'change' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
              { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            date3: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date4: [
              { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            courseTeacher: [
              { required: true, message: '请输入教师姓名', trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ],
            courseLimitNum:[
              { required: true, message: '请输入限选人数', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            courseNature: [
              { required: true, message: '请选择课程性质', trigger: 'change' }
            ]
          },
          options: [{
            value: 'monday12',
            label: '星期一[1-2节]',
            children: [{
              value: 'j01',
              label: '教一楼',
              children: [{
                value: '101',
                label: '101'
              }, {
                value: '102',
                label: '102'
              }, {
                value: '103',
                label: '103'
              }, {
                value: '104',
                label: '104'
              }]
            }, {
              value: 'j02',
              label: '教二楼',
              children: [{
                value: '101',
                label: '101'
              }, {
                value: '102',
                label: '102'
              }]
            }]
          }, {
            value: 'monday34',
            label: '星期一[3-4节]',
            children: [{
              value: 'j01',
              label: '教一楼',
              children: [{
                value: '101',
                label: '101'
              }, {
                value: '102',
                label: '102'
              }]
            }, {
              value: 'j02',
              label: '教二楼',
              children: [{
                value: '101',
                label: '101'
              }, {
                value: '102',
                label: '102'
              }]
            }]
          }],
          selectedOptions: [],
          selectedOptions2: []
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleChange(value) {
          console.log(value);
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
