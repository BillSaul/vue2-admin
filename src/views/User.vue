<template>
  <div class="manage">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form :rules="rules" :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd"> + 新增 </el-button>
      <el-form :inline="true" :model="userForm" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="userForm.name" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table :data="tableData" style="width: 100%" height="90%" stripe>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="birth" label="出生日期"></el-table-column>
        <el-table-column prop="addr" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "../api";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modelType: 0, // 0表示新增的弹窗，1表示编辑弹窗
      total: 0,
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.getList();
            });
          }
          this.handleClose();
        }
      });
    },
    handleClose() {
      // 重置整个表单
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handleEdit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getList() {
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
        this.tableData = data.list;
        this.total = data.count || 0;
      });
    },
    handleAdd() {
      this.modelType = 0;
      this.dialogVisible = true;
    },
    // 选择页码回调函数
    handlePage(val) {
      this.pageData.page = val;
      this.getList();
    },
    // 列表查询
    onSubmit() {
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .common-table {
    height: 100%;
    .pager {
      display: flex;
      justify-content: right;
    }
  }
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>
