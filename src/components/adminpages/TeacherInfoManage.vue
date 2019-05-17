<template>
    <div>
      <el-table
        :data="tableData.filter(data => !search ||
        data.teacherNumber.toLowerCase().includes(search.toLowerCase()) ||
        data.teacherName.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        id="out-teacher">
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
        <el-button type="success" round style="float: right" @click="daochu">导出教师信息</el-button>
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
          teacherNumber: '',
          teacherName: '',
          teacherAcademy: '',
          teacherContact: ''
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
        xhr.open('POST', 'http://localhost:8080/teacher/importExcel', true);
        xhr.send(fileData);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              alert("导入失败！")
            } else {
              alert("导入成功！")
            }
          }
        }
      },


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
      },
      daochu(){
        /* 从表生成工作簿对象 */
        var wb = XLSX.utils.table_to_book(document.querySelector("#out-teacher"));
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
            "教师信息.xls"
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
  .daoRu{
    float: right;
    margin-right: 1%;
  }
</style>
