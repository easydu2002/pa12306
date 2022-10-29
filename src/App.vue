<script setup lang="ts">
import { ref } from 'vue';
import {parserTicket} from './util/parse'
import {useStation} from './util/dict'
import {getTicket} from './api/ticket'

const currentDate = (() => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` }
)()
const tickets = ref([])
const query = ref({
  type: 'dc',
  // userType: 'dc',
  from: '',
  to: '',
  fromDate: currentDate,
  toDate: currentDate
})

function queryTicket() {
  getTicket(query.value)
  .then(({data}) => {
        tickets.value = data.result.map(parserTicket)
    })
}

const { options, mapping } = useStation()

</script>

<template>
  <ElCard>
    {{query}}
    <ElForm>
      <ElFormItem>
        <ElRadio v-model="query.type" label="dc">单程</ElRadio>
        <ElRadio v-model="query.type" label="wf">往返</ElRadio>
      </ElFormItem>
      <!-- <ElFormItem label="车次类型">
        <ElRadio v-model="query.type" label="dc">GC-高铁/城际</ElRadio>
        <ElRadio v-model="query.type" label="wf">D-动车</ElRadio>
        <ElRadio v-model="query.type" label="wf">Z-直达</ElRadio>
        <ElRadio v-model="query.type" label="wf">T-特快</ElRadio>
        <ElRadio v-model="query.type" label="wf">K-快速</ElRadio>
        <ElRadio v-model="query.type" label="wf">其他</ElRadio>
      </ElFormItem> -->
      <!-- <ElFormItem>
        <ElRadio v-model="query.userType">普通</ElRadio>
        <ElRadio v-model="query.userType">学生</ElRadio>
      </ElFormItem> -->
      <ElFormItem label="出发地">
        <ElSelectV2 v-model="query.from" :options="options" filterable />
      </ElFormItem>
      <ElFormItem label="目的地">
        <ElSelectV2 v-model="query.to" :options="options" filterable />
      </ElFormItem>
      <ElFormItem label="出发日">
        <ElDatePicker v-model="query.fromDate" value-format="YYYY-MM-DD" />
      </ElFormItem>
      <ElFormItem label="返程日">
        <ElDatePicker v-model="query.toDate" value-format="YYYY-MM-DD" />
      </ElFormItem>
      <ElFormItem >
        <ElButton type="warning" @click="queryTicket">查询</ElButton>
      </ElFormItem>
    </ElForm>
  </ElCard>
  <ElCard>
  <ElTable :data="tickets" border>
    <ElTableColumn prop="number" label="车次" />
      <ElTableColumn label="出发站/到达站">
        <template #default="{row}">
          <ElTag type="warning">始</ElTag>{{ mapping.get(row.from)[1] }} <br/>
          <ElTag type="success">终</ElTag>{{  mapping.get(row.to)[1] }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="出发时间/到达时间">
        <template #default="{row}">
          {{row.fromDate}} <br/>
          {{row.toDate}}
        </template>
      </ElTableColumn>
      <ElTableColumn prop="totalTime" label="历时" sortable>
        <template #default="{row}">
          {{row.totalTime}} <br />
          <!-- 当日到达 -->
        </template>
      </ElTableColumn>
      <ElTableColumn prop="seatA" label="商务座特等座" />
      <ElTableColumn prop="seat1" label="一等座" />
      <ElTableColumn prop="seat2" label="二等座" />
      <ElTableColumn prop="bedA" label="商务座特等座" />
      <ElTableColumn prop="bed1" label="一等软卧" />
      <ElTableColumn prop="dynamicBed" label="动卧" />
      <ElTableColumn prop="bed2" label="硬卧二等卧" />
      <ElTableColumn prop="ruanSeat" label="软座" />
      <ElTableColumn prop="yingSeat" label="硬座" />
      <ElTableColumn prop="stand" label="无票" />
      <ElTableColumn prop="other" label="其他" />
      <ElTableColumn prop="remark" label="备注" />
    </ElTable>
  </ElCard>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.el-card + .el-card {
  margin-top: 10px;
}
</style>
