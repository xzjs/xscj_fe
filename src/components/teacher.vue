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
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加教师" :visible.sync="addTeacherDialog">
      <el-form :model="form_add_teacher">
        <el-form-item label="姓名" label-width="60px">
          <el-input v-model="form_add_teacher.name" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="活动区域" :label-width="formLabelWidth">-->
        <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
        <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--<el-option label="区域二" value="beijing"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTeacherDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit_add_teacher">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>

<script>
  export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
