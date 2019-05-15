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
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="daoChu">
        <el-button type="success" round style="float: right">导出教师信息</el-button>
      </div>
      <div class="daoChu">
        <el-button type="warning" round style="float: right">导入教师信息</el-button>
      </div>

      <el-dialog title="个人信息" :visible.sync="dialogFormVisible1">
        <el-form :model="form">
          <el-form-item label="教师编号" :label-width="formLabelWidth">
            <el-input v-model="form.teacherNumber" ></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.teacherName" ></el-input>
          </el-form-item>
          <el-form-item label="学院" :label-width="formLabelWidth">
            <el-input v-model="form.teacherAcademy" ></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.teacherContact" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateTeacher">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        search: '',
        dialogFormVisible1: false,
        formLabelWidth: '120px',
        aaId: 0,
        form: {
          teacherNumber: '',
          teacherName: '',
          teacherAcademy: '',
          teacherContact: ''
        },
      }
    },
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible1 = true;
        this.aaId = row.teacherId;
        this.form.teacherNumber = row.teacherNumber;
        this.form.teacherName = row.teacherName;
        this.form.teacherAcademy = row.teacherAcademy;
        this.form.teacherContact = row.teacherContact;
      },
      updateTeacher(){

        var that = this;
        this.$http
          .post('http://localhost:8080/teacher/update',{"teacherId":this.aaId,"teacherNumber":this.form.teacherNumber,
            "teacherName":this.form.teacherName, "teacherAcademy":this.form.teacherAcademy,"teacherContact":this.form.teacherContact})
          .then(function (response) {
            if (response.data.data.data === 1){
              alert("修改成功!");
            } else {
              alert("修改失败!")
            }
          });
        this.dialogFormVisible1 = false;
      },

      handleDelete(index, row) {
        var params = new URLSearchParams();
        params.append('teacherId',row.teacherId);
        this.$http
          .post('http://localhost:8080/teacher/deleteOne',params)
          .then(function (response) {
            //alert(response.data.data)
          });
        this.tableData.splice(index,1);
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
