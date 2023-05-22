<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p>&nbsp;</p>
        <div class="table_container">
            <el-form :inline="true" :model="queryData" style="margin-left: 15px">
              <el-form-item label="UID">
                <el-input v-model="queryData.uid" placeholder="UID"></el-input>
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="queryData.username" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item label="角色">
                <el-select v-model="queryData.role" placeholder="角色">
                  <el-option label="" value=""></el-option>
                  <el-option label="管理员" value="1"></el-option>
                  <el-option label="老师" value="2"></el-option>
                  <el-option label="学生" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="clearQuery">重置</el-button>
                <el-button type="primary" @click="getTableData">查询</el-button>
              </el-form-item>
            </el-form>

            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index">
                </el-table-column>
                <el-table-column
                  property="uid"
                  label="用户ID">
                </el-table-column>
                <el-table-column
                  property="username"
                  label="用户姓名">
                </el-table-column>
                <el-table-column
                  property="roleDesc"
                  label="用户角色">
                </el-table-column>
                <el-table-column
                  property="directionDesc"
                  label="专业方向">
                </el-table-column>
                <el-table-column
                  property="sexDesc"
                  label="性别">
                </el-table-column>
                <el-table-column
                  property="tel"
                  label="电话">
                </el-table-column>
                <el-table-column label="操作" width="200">
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
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>

            <el-dialog title="修改用户信息" :visible.sync="dialogVisible">
                <el-form :model="selectTable">
                    <el-form-item label="用户姓名" label-width="100px">
                        <el-input v-model="updateUsername" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" label-width="100px">
                        <el-radio-group v-model="updateRole" >
                            <el-radio label="1">管理员</el-radio>
                            <el-radio label="2">教师</el-radio>
                            <el-radio label="3">学生</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="专业方向" label-width="100px" v-if="updateRole == 3">
                        <el-radio-group v-model="updateDir" >
                            <el-radio label="1">Java</el-radio>
                            <el-radio label="2">前端</el-radio>
                            <el-radio label="3">数据分析</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="性别" label-width="100px">
                        <el-radio-group v-model="updateSex" >
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="电话" label-width="100px">
                        <el-input v-model="updateTel"></el-input>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUser">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getUserListAdmin,deleteUserAdmin,updateUserAdmin,logAdd} from '@/api/getData'
    import {getStore} from '@/config/mUtils'

    export default {
        data(){
            return {
                tableData: [],
                gradeList: [],
                currentRow: null,
                count: 0,
                pageSize: 10,
                currentPage: 1,
                uid: '',
                updateRole: '',
                updateSex: '',
                updateDir: '',
                updateUid: '',
                updateUsername: '',
                updateTel: '',
                selectTable: {},
                dialogVisible: false,
                queryData: {
                  uid: '',
                  username: '',
                  role: ''
                }
            }
        },
    	components: {
    		headTop,
    	},
        created(){
        },
        mounted() {
          this.uid = getStore('uid');
          this.getTableData();
        },
        methods: {
          handleSizeChange(val){},
          handleCurrentChange(val) {
            this.currentPage = val;
            this.getTableData();
          },
          async getTableData() {
            const params = {
              size: this.pageSize,
              page: this.currentPage,
              uid: this.queryData.uid == '' ? null : this.queryData.uid,
              username: this.queryData.username == '' ? null : this.queryData.username,
              role: this.queryData.role == '' ? null : this.queryData.role
              }

            const res = await getUserListAdmin(params);
            this.tableData = res.data.list;
            this.count = res.data.total;
          },
          handleEdit(index, row) {
            if (row.uid == this.uid){
              this.$message({
                message: '不能操作自己',
                type: 'warning'
              });
              return;
            }
            this.updateUid = row.uid;
            this.updateUsername = row.username;
            this.updateRole = '' + row.role;
            this.updateDir = '' + row.direction;
            this.updateSex = '' + row.sex;
            this.updateTel = row.tel;
            this.dialogVisible = true;
          },
          async updateUser() {
            // 更新
            const params = {
              uid: this.updateUid,
              username: this.updateUsername,
              tel: this.updateTel,
              role: this.updateRole,
                direction: this.updateDir,
                sex: this.updateSex,
              };
            await updateUserAdmin(params);
              await logAdd({uid: this.uid, content:'修改用户信息'})
            this.dialogVisible = false;
            this.getTableData();
          },
          async handleDelete(index, row) {
            if (row.uid == this.uid){
              this.$message({
                message: '不能操作自己',
                type: 'warning'
              });
              return;
            }
            // 删除
            const params = {uid: row.uid};
            await deleteUserAdmin(params);
              await logAdd({uid: this.uid, content:'删除用户'})
            this.getTableData();
          },
          clearQuery() {
            this.queryData.uid = '';
            this.queryData.username = '';
            this.queryData.role = '';
          }
        }

    }
</script>

<style lang="less">

</style>
