<template>
    <div>
      <el-table
        :data="tableData.filter(data => !search ||
        data.studentNumber.toLowerCase().includes(search.toLowerCase()) ||
        data.studentName.toLowerCase().includes(search.toLowerCase()) ||
        data.studentClass.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        id="out-table">
        <el-table-column
          label="学号"
          prop="studentNumber">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="studentName">
        </el-table-column>
        <el-table-column
          label="班级"
          prop="studentClass">
        </el-table-column>
        <el-table-column
          label="专业"
          prop="studentProfession">
        </el-table-column>
        <el-table-column
          label="学院"
          prop="studentAcademy">
        </el-table-column>
        <el-table-column
          label="入学时间"
          prop="studentInTime">
        </el-table-column>
        <el-table-column
          label="联系方式"
          prop="studentContact">
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
        <el-button type="success" round style="float: right" @click="daochu">导出学生信息</el-button>
      </div>
      <div class="daoRu">
        <form enctype="multipart/form-data" >
          <input type="file"  name="attence" style="display: none;" @change="changeFile($event)" ref="attenceInput" />
          <button class="btn btn-primary btn-md"  @click="chooseFile" > 选择 </button>
          <span> {{ attence }} </span>
          <button class="btn btn-primary btn-md" @click="upFile"> 确认导入 </button>
        </form>

      </div>

      <el-dialog title="个人信息" :visible.sync="dialogFormVisible1">
        <el-form :model="form">
          <el-form-item label="学号" :label-width="formLabelWidth">
            <el-input v-model="form.studentNumber" ></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.studentName"></el-input>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-input v-model="form.studentClass" ></el-input>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth">
            <el-input v-model="form.studentProfession" ></el-input>
          </el-form-item>
          <el-form-item label="学院" :label-width="formLabelWidth">
            <el-input v-model="form.studentAcademy" ></el-input>
          </el-form-item>
          <el-form-item label="入学时间" :label-width="formLabelWidth">
            <el-input v-model="form.studentInTime" ></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.studentContact" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateStudent">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
  import FileSaver from "file-saver";
  import XLSX from "xlsx";

  export default {
    data() {
      return {
        tableData: [],
        search: '',
        dialogFormVisible1: false,
        formLabelWidth: '120px',
        aaId: 0,
        form: {
          studentNumber: '',
          studentName: '',
          studentClass: '',
          studentProfession: '',
          studentAcademy: '',
          studentInTime: '',
          studentContact: ''
        },

        // 文件
        attence: '',
        attenceFile: {}
      }
    },
    methods: {

      chooseFile () {
        this.$refs.attenceInput.click();
      },
      changeFile (e) {
        this.attence = e.target.files[0].name;
        this.attenceFile = e.target.files[0];
        console.log(this.attenceFile);
      },

      upFile () {
        let filename = this.attenceFile.name;
        let arr = filename.split('.');
        if (arr[1] !== 'xls') {
          alert("文件格式错误！");
        }
        let fileData = new window.FormData();
        fileData.append('file', this.attenceFile);
        let xhr = new window.XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/student/importExcel', true);
        xhr.send(fileData);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              alert("导入成功！")
            } else {
              alert("导入失败！")
            }
          }
        }
      },


      handleEdit(index, row) {
        //alert(row.studentId);
        this.dialogFormVisible1 = true;
        this.aaId = row.studentId;
        this.form.studentNumber = row.studentNumber;
        this.form.studentName = row.studentName;
        this.form.studentClass = row.studentClass;
        this.form.studentProfession = row.studentProfession;
        this.form.studentAcademy = row.studentAcademy;
        this.form.studentInTime = row.studentInTime;
        this.form.studentContact = row.studentContact;
      },

      updateStudent(){

        var that = this;
        this.$http
          .post('http://localhost:8080/student/update',{"studentId":this.aaId,"studentNumber":this.form.studentNumber,
          "studentName":this.form.studentName,"studentClass":this.form.studentClass,"studentProfession":this.form.studentProfession,
          "studentAcademy":this.form.studentAcademy,"studentInTime":this.form.studentInTime,"studentContact":this.form.studentContact})
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
        params.append('studentId',row.studentId);
        this.$http
          .post('http://localhost:8080/student/deleteOne',params)
          .then(function (response) {
            //alert(response.data.data)
          });
        this.tableData.splice(index,1);
      },

      daochu(){
          /* 从表生成工作簿对象 */
          var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
          /* 获取二进制字符串作为输出 */
          var wbout = XLSX.write(wb, {
            bookType: "xls",
            bookSST: true,
            type: "array"
          });
          try {
            FileSaver.saveAs(
              //Blob 对象表示一个不可变、原始数据的类文件对象。
              //Blob 表示的不一定是JavaScript原生格式的数据。
              //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
              //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
              new Blob([wbout], { type: "application/octet-stream" }),
              //设置导出文件名称
              "学生信息.xls"
            );
          } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
        //alert("导出成功！")
      }
    },
    created() {
      var that = this;
      this.$http
        .get('http://localhost:8080/student/all')
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
  .daoRu{
    float: right;
    margin-right: 1%;
  }
</style>
