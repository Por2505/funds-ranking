# Answers to techical questions

## ใช้เวลาทำแบบทดสอบไปเท่าไร ถ้ามีเวลามากกว่านี้จะทำอะไรเพิ่ม ถ้าใช้เวลาน้อยในการทำโจทย์สาภมารถใช้โอกาสนี้ในการอธิบายได้ว่าอยากเพิ่มอะไร หรือแก้ไขในส่วนไหน

ใช้เวลาทำ 5 วัน วันละประมาณ 1-2 ชั่วโมง ถ้ามีเวลามากกว่าอยากทำการตัวกรองเพิ่มเติม มีตัวกรอง sort ผลตอบแทน ราคา จากน้อยไปมาก หรือจากมากไปน้อย

## อะไรคือ feature ที่นำเข้ามาใช้ในการพัฒนา application นี้ กรุณาแนบ code snippet มาด้วยว่าใช้อย่างไร ในส่วนไหน

การ customize component pagination ของ tailwind.css plugins/vue-tailwind.js

```
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import { TPagination } from 'vue-tailwind/dist/components'

const settings = {
  't-pagination': {
    component: TPagination,
    props: {
      classes: {
        wrapper:
          'table border-collapse text-center bg-white mx-auto text-xs font-medium text-gray-800 shadow-sm rounded-full',
        element:
          'w-7 h-7 border border-gray-300 bg-white table-cell hover:bg-gray-50 font-medium',
        activeElement: 'w-7 h-7 border border-gray-300 table-cell',
        disabledElement: 'w-7 h-7 border border-gray-300 table-cell',
        ellipsisElement: 'w-7 h-7 border border-gray-300 hidden md:table-cell',
        activeButton:
          'bg-gray-50 text-yellow-500 font-bold w-full border-gray-100 h-full hover:bg-gray-100 transition duration-100 ease-in-out focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-opacity-50',
        disabledButton:
          'opacity-25 w-full h-full cursor-not-allowed transition duration-100 ease-in-out',
        button:
          'hover:bg-gray-100 w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-opacity-50',
        ellipsis: '',
      },
    },
  },
}

Vue.use(VueTailwind, settings)

```

การทำ component ไปใช้

```
      <t-pagination
        v-model="pagination.currentPage"
        :total-items="paginate.total_record"
        :limit="pagination.limit"
        :per-page="pagination.limit"
      />

```

## เราจะสามารถติดตาม performance issue บน production ได้อย่างไร เคยมีประสบการณ์ด้านนี้ไหม

ไม่เคยมีประสบการณ์ด้านนี้เลย

## อยากปรับปรุง FINNOMENA APIs ที่ใช้ในการพัฒนา ในส่วนไหนให้ดียิ่งขึ้น

อยากปรับ APIs ใช้สามารถยิง GetFundsByRange APIs เส้นเดียวที่ส่ง query string (1D,1W,1M,1Y)
