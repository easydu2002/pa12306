<script setup lang="ts">
import { computed, ref } from 'vue';
import { parserTicket } from './util/parse'
import { useStation } from './util/dict'
import { getTicket,TicketQuery } from './api/ticket'
import { FormInstance, FormRules } from 'element-plus';
import { Ticket } from './util/parse'

const currentDate = (() => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
)()
const tickets = ref<Ticket[]>([])
const query = ref<TicketQuery>({
  type: 'dc',
  // userType: 'dc',
  from: '',
  to: '',
  fromDate: currentDate,
  toDate: currentDate
})
const filterParams = ref({
  types: ['G', 'D', 'Z', 'T', 'K', 'QT']
})
const filterTickets = computed(() => {
  return tickets.value.filter((item) => {
    if(filterParams.value.types.length === 6) {
      return true
    }
    return !!filterParams.value.types.find(type => item.number.startsWith(type))
  })
})

const { options } = useStation()
const filterOptions = ref(options.value)
function filterStation (keywords: string) {
  if(!keywords) {
    return filterOptions.value = options.value
  }
  filterOptions.value = []
  options.value.forEach(item => {
    // @ts-ignore
    if(item.searchStr.includes(keywords)) {
      filterOptions.value.push(item)
    }
  })
}
const RefQueryFrom = ref<FormInstance>()

const queryRules: FormRules = {
  type: { required: true, message: '类型必填!' },
  from: { required: true, message: '出发地必填!' },
  to: { required: true, message: '目的地必填!' },
  fromDate: { required: true, message: '类型必填!' },
}

function queryTicket() {
  RefQueryFrom.value?.validate(valid => {
    if (valid) {
      getTicket(query.value)
        .then(({ data }) => {
          tickets.value = data.result.map((item: string) => parserTicket(item, data.map))
          ElMessage.success(`查询完成，共计${data.result.length}条数据`)
        })
        .catch(err => {
          console.trace(err);
          ElMessage.error(err.message ?? err)
        })
    }
  })
}
</script>

<template>
  <ElCard>
    <ElForm ref="RefQueryFrom" :model="query" :rules="queryRules" label-width="90px">
      <ElRow>
        <ElCol :span="2">
          <ElFormItem prop="type" label-width="0">
            <ElRadio v-model="query.type" label="dc">单程</ElRadio>
            <ElRadio v-model="query.type" label="wf">往返</ElRadio>
          </ElFormItem>
        </ElCol>
        <ElCol :span="4">
          <ElFormItem prop="from" label="出发地">
            <ElSelectV2 v-model="query.from" :options="options" filterable />
          </ElFormItem>
        </ElCol>
        <ElCol :span="4">
          <ElFormItem prop="to" label="目的地">
            <ElSelectV2 v-model="query.to" :options="options" filterable />
          </ElFormItem>
        </ElCol>
        <ElCol :span="4">
          <ElFormItem prop="fromDate" label="出发日">
            <ElDatePicker v-model="query.fromDate" value-format="YYYY-MM-DD" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="4">
          <ElFormItem prop="toDate" label="返程日">
            <ElDatePicker v-model="query.toDate" value-format="YYYY-MM-DD" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="4">
          <ElFormItem>
            <ElButton type="warning" @click="queryTicket">查询</ElButton>
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>

    <ElRow>
      <ElCol :span="10">
        <ElForm>
          <ElFormItem label="车次类型">
            <ElCheckboxGroup v-model="filterParams.types">
              <ElCheckbox label="G">GC-高铁/城际</ElCheckbox>
              <ElCheckbox label="D">D-动车</ElCheckbox>
              <ElCheckbox label="Z">Z-直达</ElCheckbox>
              <ElCheckbox label="T">T-特快</ElCheckbox>
              <ElCheckbox label="K">K-快速</ElCheckbox>
              <ElCheckbox label="QT">其他</ElCheckbox>
            </ElCheckboxGroup>
          </ElFormItem>
          <!-- <ElFormItem label="出发车站">
          </ElFormItem>
          <ElFormItem label="到达车站">
          </ElFormItem> -->
        </ElForm>
      </ElCol>

    </ElRow>

  </ElCard>

  <ElCard>
    <ElTable :data="filterTickets" border >
      <ElTableColumn prop="number" label="车次" align="center" />
      <ElTableColumn align="center" width="120px">
        <template #header>
          出发站<br />到达站
        </template>
        <template #default="{ row }">
          <ElTag type="warning">始</ElTag> {{ row.from }} <br />
          <ElTag type="success">终</ElTag> {{ row.to }}
        </template>
      </ElTableColumn>
      <ElTableColumn align="center">
        <template #header>
          出发时间<br />到达时间
        </template>
        <template #default="{ row }">
          {{ row.fromDate }} <br />
          {{ row.toDate }}
        </template>
      </ElTableColumn>
      <ElTableColumn prop="totalTime" label="历时" sortable align="center">
        <template #default="{ row }">
          {{ row.totalTime }} <br />
          <!-- 当日到达 -->
        </template>
      </ElTableColumn>
      <ElTableColumn prop="seatA" align="center">
        <template #header>
          商务座<br />特等座
        </template>
      </ElTableColumn>
      <ElTableColumn prop="seat1" label="一等座" align="center" />
      <ElTableColumn prop="seat2" align="center">
        <template #header>
          二等座<br />二等包座
        </template>
      </ElTableColumn>
      <ElTableColumn prop="bedA" label="高级软卧" align="center" />
      <ElTableColumn prop="bed1" align="center">
        <template #header>
          软卧<br />一等卧
        </template>
      </ElTableColumn>
      <ElTableColumn prop="dynamicBed" label="动卧" align="center" />
      <ElTableColumn prop="bed2" align="center">
        <template #header>
          硬卧<br />二等卧
        </template>
      </ElTableColumn>
      <ElTableColumn prop="ruanSeat" label="软座" align="center" />
      <ElTableColumn prop="yingSeat" label="硬座" align="center" />
      <ElTableColumn prop="stand" label="无票" align="center" />
      <ElTableColumn prop="other" label="其他" align="center" />
      <ElTableColumn prop="remark" label="备注" align="center" />
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

.el-card+.el-card {
  margin-top: 10px;
}
</style>
