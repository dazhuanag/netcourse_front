<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p>&nbsp;</p>
        <div class="table_container">
            <el-form :inline="true" :model="queryData" style="margin-left: 15px">
              <el-form-item label="日志内容">
                <el-input v-model="queryData.content" placeholder="日志内容"></el-input>
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
                  property="logId"
                  label="日志ID"
                  width="200">
                </el-table-column>
                <el-table-column
                  property="username"
                  label="操作人">
                </el-table-column>
                <el-table-column
                  property="content"
                  label="日志内容">
                </el-table-column>
<!--                <el-table-column label="操作" width="200">-->
<!--                  <template slot-scope="scope">-->
<!--                    <el-button-->
<!--                      size="mini"-->
<!--                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--                    <el-button-->
<!--                      size="mini"-->
<!--                      type="danger"-->
<!--                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--                  </template>-->
<!--                </el-table-column>-->
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

        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { logList } from '@/api/getData'
    import {getStore} from '@/config/mUtils'

    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                count: 0,
                pageSize: 10,
                currentPage: 1,
                uid: '',
                updateId: '',
                updateContent: '',
                dialogVisible: false,
                queryData: {
                    content: ''
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
                content: this.queryData.content
            }
            const res = await logList(params);
            this.tableData = res.data.list;
            this.count = res.data.total;
          },
          handleEdit(index, row) {
            this.updateId = row.id;
            this.updateContent = row.content;
            this.dialogVisible = true;
          },

          clearQuery() {
            this.queryData.content = '';
          }
        }

    }
</script>

<style lang="less">

</style>
