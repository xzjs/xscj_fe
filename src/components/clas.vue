<template>
  <div>
    <div class="add_btn_box">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addTeacherDialog = true"></el-button>
    </div>
    <el-table :data="teachersTable">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column prop="name" label="姓名" >
      </el-table-column>
      <el-table-column label="操作">
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
  </div>

</template>

<script>
    export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
