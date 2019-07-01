<template>
  <div class="home">
    <el-form ref="form" :model="form" label-width="80px" :inline='true' label-position='left' size='mini'>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="快递号">
        <el-input v-model="form.express_num"></el-input>
      </el-form-item>
      <el-form-item label="发货日期">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="form.delivery_date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="种类">
        <el-input v-model="form.kind"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-input v-model="form.brand"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="showNewPanel">新建</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="exportData">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="">
      </el-table-column>
      <el-table-column
        prop="express_num"
        label="快递号"
        width="">
      </el-table-column>
      <el-table-column
        prop="express_num"
        label="快递号"
        width="">
      </el-table-column>
      <el-table-column
        prop="delivery_date"
        label="发货日期"
        width="">
      </el-table-column>
      <el-table-column
        prop="kind"
        label="种类"
        width="">
      </el-table-column>
      <el-table-column
        prop="brand"
        label="品牌"
        width="">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="数量"
        width="">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价"
        width="">
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="创建日期"
        width="">
      </el-table-column>
      <el-table-column
        prop="updateAt"
        label="更新日期"
        width="">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index)"
            type="text"
            size="small">
            移除
          </el-button>
          <el-button
            @click.native.prevent="updateRow(scope.$index)"
            type="text"
            size="small">
            更新
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change='pageChange'
      background
      layout="prev, pager, next"
      :page-size='pageSize'
      :total="total"
      :current-page.sync='offset'>
    </el-pagination>
    <el-dialog :title="panelTitle" :visible.sync="newPanelVisible">
    <el-form :model="newform" label-width="80px"  size='mini'>
      <el-form-item label="姓名">
        <el-input v-model="newform.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="newform.phone"></el-input>
      </el-form-item>
      <el-form-item label="快递号">
        <el-input v-model="newform.express_num"></el-input>
      </el-form-item>
      <el-form-item label="发货日期">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="newform.delivery_date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="种类">
        <el-input v-model="newform.kind"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-input v-model="newform.brand"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="newform.price"></el-input>
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="newform.amount"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="newform.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPanelSubmit">{{panelTitle}}</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      form: {
        name: '',
        phone: '',
        express_num: '',
        delivery_date: null,
        kind: '',
        brand: ''
      },
      newform: {
        id: undefined,
        name: '',
        phone: '',
        express_num: '',
        delivery_date: null,
        kind: '',
        brand: '',
        price: '',
        amount: '',
        address: ''
      },
      tableData: [],
      total: 0,
      offset: 1,
      pageSize: 100,
      item: {
        name: '',
        phone: '',
        express_num: '',
        delivery_date: null,
        kind: '',
        brand: '',
        amount: '',
        price: '',
        address: ''
      },
      newPanelVisible: false,
      panelTitle: '新建'
    }
  },
  created () {
    function getNowFormatDate () {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    }

    this.form.delivery_date = getNowFormatDate()
  },
  mounted () {
    this.doQuery()
  },
  methods: {
    formatQuery (form) {
      let query = {}
      for (let key in form) {
        query[key] = form[key] ? form[key] : null
      }
      return query
    },
    async doQuery () {
      let query = this.formatQuery(this.form)
      let params = {
        params: {
          limit: this.pageSize,
          offset: (this.offset - 1) * this.pageSize,
          ...query
        }
      }
      let res = await httpIns.get('/c/queryOrders', params)
      if (res.data.status === 0) {
        this.tableData = res.data.data.results
        this.total = res.data.data.total
      }
    },
    pageChange () {
      this.doQuery()
    },
    onSubmit () {
      this.doQuery()
    },
    async deleteRow (index) {
      let id = this.tableData[index].id
      let res = await httpIns.get(`/c/${id}/deleteOrder`)
      let data = res.data
      if (data.status === 0) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.doQuery()
      }
    },
    showNewPanel () {
      this.newPanelVisible = true
    },
    updateRow (index) {
      this.panelTitle = '更新'
      this.newform = this.tableData[index]
      this.newPanelVisible = true
    },
    onPanelSubmit () {
      this.saveNew()
    },
    async saveNew () {
      let id = this.newform.id
      let params = Object.assign({}, this.newform)
      params.id = undefined
      let targetUrl
      let showMsg
      if (this.panelTitle === '新建') {
        showMsg = '新建成功'
        targetUrl = '/c/saveOrder'
      } else if (this.panelTitle === '更新') {
        showMsg = '更新成功'
        targetUrl = `/c/${id}/updateOrder`
      }
      let res = await httpIns.post(targetUrl, params)
      let data = res.data
      if (data.status === 0) {
        this.newform = {
          id: undefined,
          name: '',
          phone: '',
          express_num: '',
          delivery_date: null,
          kind: '',
          brand: '',
          price: '',
          amount: '',
          address: ''
        }
        this.$message({
          message: showMsg,
          type: 'success'
        })
        this.newPanelVisible = false
      } else {
        this.$message({
          message: '操作失败',
          type: 'error'
        })
      }
    },
    async exportData () {
      let query = this.formatQuery(this.form)
      let search = '?'
      for (let key in query) {
        if (query[key] !== null) search += key + '=' + query[key] + '&'
      }
      search = search.slice(0, -1)
      console.log(search)
      window.open('/c/exportOrders' + search)
    }
  }
}
</script>
