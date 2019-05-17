<template>
    <div>
      <el-table
        :data="tableData.filter(data => !search || data.room.toLowerCase().includes(search.toLowerCase()))"
        height="600"
        style="width: 100%">
          <el-table-column
          label="教室/地点"
          prop="room">
        </el-table-column>
        <el-table-column
          label="排课时间"
          prop="time">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="搜索教室"/>
          </template>
          <template slot-scope="scope">

          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tableData: [],
          search: ''
        }
      },
      methods: {
      },
      created() {
        var that = this;
        this.$http
          .get('http://localhost:8080/room/all')
          .then(function (response) {
            that.tableData = response.data.data.data;
          })
      },
    }
</script>

<style scoped>

</style>
